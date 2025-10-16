import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function ShowSolBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();

  async function getBalance() {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      const balanceElem = document.getElementById("balance");
      if (balanceElem) {
        balanceElem.innerHTML = String(balance / LAMPORTS_PER_SOL);
      }
    }
  }

  getBalance();
  return (
    <div>
      <p>SOL BALANCE:</p>
      <div id="balance"></div>
    </div>
  );
}
