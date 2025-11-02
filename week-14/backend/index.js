const express = require("express");
// const { UserModel } = require("./models");
const { Keypair, Transaction, Connection } = require("@solana/web3.js");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const bs58 = require("bs58");
const cors = require("cors");

// const connection = new Connection(
//   "https://solana-mainnet.g.alchemy.com/v2/6-m6uhkH9CAnuILt04LPc"
// );
const connection = new Connection("https://api.mainnet-beta.solana.com");

const app = express();
app.use(express.json());
app.use(cors());

// app.post("/api/v1/signup", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   // validate the inputs using zod, check if the user already exists, hash the password

//   const keypair = new Keypair();

//   await UserModel.create({
//     username,
//     password,
//     publicKey: keypair.publicKey.toString(),
//     privateKey: keypair.secretKey.toString(),
//   });

//   res.json({
//     message: keypair.publicKey.toString(),
//   });
// });

// app.post("/api/v1/signin", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   const user = await UserModel.findOne({
//     username: username,
//     password: password,
//   });

//   if (user) {
//     const token = jwt.sign(
//       {
//         id: user,
//       },
//       "secret"
//     );
//   } else {
//     res.json({
//       message: "User not found",
//     });
//   }
// });

app.post("/api/v1/txn/sign", async (req, res) => {
  const serializedTransaction = req.body.message;

  const tx = Transaction.from(Buffer.from(serializedTransaction));
  // const user = await UserModel.find({
  //   where: {
  //     _id: ""
  //   }
  // })
  // const privateKey = user.privateKey;

  const keypair = Keypair.fromSecretKey(
    bs58.default.decode(process.env.PRIVATE_KEY)
  );

  const { blockhash } = await connection.getLatestBlockhash();
  tx.blockhash = blockhash;
  tx.feePayer = keypair.publicKey;
  tx.sign(keypair);

  await connection.sendTransaction(tx, [keypair]);

  res.json({
    message: "Sign up",
  });
});

app.post("/api/v1/txn", (req, res) => {
  res.json({
    message: "Sign up",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
