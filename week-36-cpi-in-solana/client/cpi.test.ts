import { test, expect } from "bun:test";
import { LiteSVM } from "litesvm";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

test("CPI works as expected", async () => {
  let svm = new LiteSVM();

  let doubleContract = PublicKey.unique();
  let cpiContract = PublicKey.unique();

  svm.addProgramFromFile(doubleContract, "./double.so");
  svm.addProgramFromFile(cpiContract, "./cpi.so");

  let userAcc = new Keypair();
  let dataAcc = new Keypair();
  svm.airdrop(userAcc.publicKey, BigInt(1_000_000_000));

  createDataAccOnChain(svm, dataAcc, userAcc, doubleContract);

  function doubleIt() {
    let ix = new TransactionInstruction({
      keys: [
        { pubkey: dataAcc.publicKey, isSigner: true, isWritable: true },
        { pubkey: doubleContract, isSigner: false, isWritable: false },
      ],
      programId: cpiContract,
      data: Buffer.from(""),
    });

    let tx = new Transaction();
    tx.recentBlockhash = svm.latestBlockhash();
    tx.feePayer = userAcc.publicKey;
    tx.add(ix);
    tx.sign(userAcc, dataAcc);
    svm.sendTransaction(tx);
    svm.expireBlockhash();
  }

  doubleIt();
  doubleIt();
  doubleIt();
  doubleIt();

  let data = svm.getAccount(dataAcc.publicKey);
  expect(data?.data[0]).toBe(8);
  expect(data?.data[1]).toBe(0);
  expect(data?.data[2]).toBe(0);
  expect(data?.data[3]).toBe(0);
});

function createDataAccOnChain(
  svm: LiteSVM,
  dataAcc: Keypair,
  payer: Keypair,
  doubleContract: PublicKey
) {
  const blockhash = svm.latestBlockhash();
  const ixs = [
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: dataAcc.publicKey,
      lamports: Number(svm.minimumBalanceForRentExemption(BigInt(4))),
      space: 4,
      programId: doubleContract,
    }),
  ];

  const tx = new Transaction();
  tx.recentBlockhash = blockhash;
  tx.feePayer = payer.publicKey;
  tx.add(...ixs);
  tx.sign(payer, dataAcc);
  svm.sendTransaction(tx);
}
