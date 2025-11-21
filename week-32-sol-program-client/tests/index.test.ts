import { expect, test } from "bun:test";
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { COUNTER_SIZE, schema } from "./types";
import * as borsh from "borsh";

let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();
const PROGRAM_ID = new PublicKey("C6sRc3ufTMtk65YTNttJUykgYC8SoV9dfu2vM6hiN1mV");
const connection = new Connection("http://localhost:8899", "confirmed");

test("Account is initialized", async () => {
  const txn = await connection.requestAirdrop(
    adminAccount.publicKey,
    1 * 1000_000_000
  );

  await connection.confirmTransaction(txn, "confirmed");

  const lamports = await connection.getMinimumBalanceForRentExemption(COUNTER_SIZE);

  const ix = SystemProgram.createAccount({
    fromPubkey: adminAccount.publicKey,
    newAccountPubkey: dataAccount.publicKey,
    lamports,
    space: COUNTER_SIZE,
    programId: PROGRAM_ID,
  })

  const createAccountTxn = new Transaction();
  createAccountTxn.add(ix);
  const signature = await connection.sendTransaction(createAccountTxn, [adminAccount, dataAccount]);
  await connection.confirmTransaction(signature, "confirmed");
  console.log(dataAccount.publicKey.toBase58());

  const dataAccountInfo = await connection.getAccountInfo(dataAccount.publicKey);
  console.log(dataAccountInfo?.data);
  const counter = borsh.deserialize(schema, dataAccountInfo?.data);
  console.log(counter.count);
  expect(counter.count).toBe(0);
});
