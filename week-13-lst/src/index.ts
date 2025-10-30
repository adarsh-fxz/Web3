require("dotenv").config();
import express from "express";
import { burnTokens, mintTokens, sendNativeTokens } from "./mintTokens";

const app = express();

const HELIUS_RESPONSE = {
  "nativeTransfers": [{
    "amount": 10000000,
    "fromUserAccount": "8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857",
    "toUserAccount": "G6WVXCkT7xatjdAwqFAbFRmheVsQ5SEatX1Ew2ZDBZrU"
  }]
}

const VAULT = "G6WVXCkT7xatjdAwqFAbFRmheVsQ5SEatX1Ew2ZDBZrU";

app.post("/helius", async (req, res) => {
  const incomingTx = HELIUS_RESPONSE.nativeTransfers.find(x => x.toUserAccount === VAULT);
  if (!incomingTx) {
    res.json({ message: "processed" })
    return;
  }

  const fromAddress = incomingTx.fromUserAccount;
  const toAddress = VAULT;
  const amount = incomingTx.amount;
  const type = "received_native_sol";

  await mintTokens(fromAddress, amount);

  // if (type === "received_native_sol") {
  //   await mintTokens(fromAddress, toAddress, amount);
  // } else {
  //   // What could go wrong here?
  //   await burnTokens(fromAddress, toAddress, amount);
  //   await sendNativeTokens(fromAddress, toAddress, amount);
  // }

  res.send("Transaction successful");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
