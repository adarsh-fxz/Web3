import express from "express";
import { HDNodeWallet } from "ethers6";
import { mnemonicToSeedSync } from "bip39";
import { MNUENOMICS } from "./config.js";
import { Client } from "pg";

const client = new Client("postgresql://adarsh:secret123@localhost:5432/mydb");
client.connect();

const seed = mnemonicToSeedSync(MNUENOMICS);

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.query("BEGIN");

    const result = await client.query(
      "INSERT INTO binanceUsers (username, password, depositAddress, privateKey, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [username, password, "", "", 0]
    );

    const userId = result.rows[0].id;

    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0`);

    await client.query(
      "UPDATE binanceUsers SET depositAddress=$1, privateKey=$2 WHERE id=$3",
      [child.address, child.privateKey, userId]
    );

    await client.query("COMMIT");

    res.json({ userId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/depositAddress/:userId", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
