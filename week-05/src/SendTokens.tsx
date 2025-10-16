import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export default function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to") as HTMLInputElement;
        let amount = document.getElementById("token-amount") as HTMLInputElement;

        const transaction = new Transaction();
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey!,
                toPubkey: new PublicKey(to.value),
                lamports: parseFloat(amount.value) * LAMPORTS_PER_SOL,
            })
        );
        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount.value + " SOL to " + to.value);
    }
  return (
    <div>
        <input id="to" type="text" placeholder="To" />
        <input id="token-amount" type="number" placeholder="Amount in SOL" />
        <button onClick={sendTokens}>Send Tokens</button>
    </div>
  )
}
