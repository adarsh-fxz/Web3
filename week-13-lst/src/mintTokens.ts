import { mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address";
import bs58 from "bs58";

const connection = new Connection("https://api.mainnet-beta.solana.com");

function base58ToKeypair(privateKeyBase58: string): Keypair {
  try {
    const privateKeyBytes = bs58.decode(privateKeyBase58);
    return Keypair.fromSecretKey(privateKeyBytes);
  } catch (error) {
    throw new Error("Invalid base58 private key");
  }
}

const keypair = base58ToKeypair(PRIVATE_KEY!);

export const mintTokens = async (
  fromAddress: string,
  amount: number
) => {
  // before minting, get or create associated token account for fromAddress
  await mintTo(connection, keypair, TOKEN_MINT_ADDRESS!, new PublicKey(fromAddress), keypair, amount);
};

export const burnTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: number
) => {
  console.log("Burning tokens");
};

export const sendNativeTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: number
) => {
  console.log("Sending native tokens");
};
