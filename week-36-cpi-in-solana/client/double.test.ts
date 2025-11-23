import { test } from "node:test";
import assert from "node:assert/strict";
import { LiteSVM } from "litesvm";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
} from "@solana/web3.js";

test("one transfer", () => {
  const svm = new LiteSVM();
  const contractPubkey = PublicKey.unique();
  // loading our contract to the local svm
  svm.addProgramFromFile(contractPubkey, "./double.so");
  const payer = new Keypair();
  svm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL));
  const dataAccount = new Keypair();
  const blockhash = svm.latestBlockhash();
  const ixs = [
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: dataAccount.publicKey,
      lamports: Number(svm.minimumBalanceForRentExemption(BigInt(4))),
      space: 4,
      programId: contractPubkey,
    }),
  ];

  const tx = new Transaction();
  tx.recentBlockhash = blockhash;
  tx.feePayer = payer.publicKey;
  tx.add(...ixs);
  tx.sign(payer, dataAccount);
  svm.sendTransaction(tx);
  const balanceAfter = svm.getBalance(dataAccount.publicKey);
  assert.strictEqual(
    balanceAfter,
    svm.minimumBalanceForRentExemption(BigInt(4))
  );

  function doubleIt() {
    const ix2 = new TransactionInstruction({
      keys: [
        { pubkey: dataAccount.publicKey, isSigner: false, isWritable: true },
      ],
      programId: contractPubkey,
      data: Buffer.from(""),
    });

    const tx2 = new Transaction();
    tx2.recentBlockhash = svm.latestBlockhash();
    tx2.feePayer = payer.publicKey;
    tx2.add(ix2);
    tx2.sign(payer);
    svm.sendTransaction(tx2);
    svm.expireBlockhash();
  }

  doubleIt();
  doubleIt();
  doubleIt();
  doubleIt();

  const newDataAcc = svm.getAccount(dataAccount.publicKey);

  assert.strictEqual(newDataAcc?.data[0], 8);
  assert.strictEqual(newDataAcc?.data[1], 0);
  assert.strictEqual(newDataAcc?.data[2], 0);
  assert.strictEqual(newDataAcc?.data[3], 0);
});
