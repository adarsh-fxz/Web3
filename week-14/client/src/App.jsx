import "./App.css";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
  Connection,
} from "@solana/web3.js";
import axios from "axios";

const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/6-m6uhkH9CAnuILt04LPc"
);
const fromPubkey = new PublicKey(
  "G6WVXCkT7xatjdAwqFAbFRmheVsQ5SEatX1Ew2ZDBZrU"
);

function App() {
  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey("DKiWVyP2QHs16f5mncnG3QHJLXev8qPnYKzqP6qmfFHR"),
      lamports: 0.000000001 * LAMPORTS_PER_SOL,
    });
    const tx = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = fromPubkey;

    // convert the transaction to a bunch of bytes

    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    });

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTx,
      retry: false,
    });
  }

  return (
    <>
      <input type="text" placeholder="Amount" />
      <input type="password" placeholder="Address" />
      <button onClick={sendSol}>Submit</button>
    </>
  );
}

export default App;
