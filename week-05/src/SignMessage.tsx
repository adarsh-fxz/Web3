import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();

  const onClick = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!signMessage) {
      alert("Please sign the message first!");
      return;
    }

    const message = document.getElementById("message") as HTMLInputElement;
    const encodedMessage = new TextEncoder().encode(message.value);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert("Signature verification failed!");
      return;
    }

    alert(`Message signature: ${bs58.encode(signature)}`);
  };
  return (
    <div>
      <input id="message" type="text" placeholder="Message" />
      <button onClick={onClick}>Sign Message</button>
    </div>
  );
}
