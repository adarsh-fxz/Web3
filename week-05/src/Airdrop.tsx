import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function requestAirdrop() {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    let amountInput = document.getElementById("amount") as HTMLInputElement;
    const amount = parseFloat(amountInput.value);
    await connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
  }

  return (
    <div>
      <input type="number" id="amount" placeholder="Amount in SOL" />
      <button onClick={requestAirdrop}>Request Airdrop</button>
    </div>
  );
}
