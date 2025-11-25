import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Week38Anchor } from "../target/types/week_38_anchor";
import assert from "assert";

describe("week-38-anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const newAccount = anchor.web3.Keypair.generate();

  const program = anchor.workspace.week38Anchor as Program<Week38Anchor>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .init(10)
      .accounts({
        signer: anchor.getProvider().wallet.publicKey,
        account: newAccount.publicKey,
      })
      .signers([newAccount])
      .rpc();
    console.log("Your transaction signature", tx);
    const account = await program.account.dataShape.fetch(newAccount.publicKey);
    assert(account.num == 10);
  });
});
