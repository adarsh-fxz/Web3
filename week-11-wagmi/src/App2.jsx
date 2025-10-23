import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export default function App2() {
  async function getBalance() {
    const res = await client.getBalance({address: "0x6f840234AC35e375C1fD8B150E742d3731672815"});
    console.log(res);
  }
  return (
    <div>
      <button onClick={getBalance}>Get Balance</button>
    </div>
  );
}
