import "./App.css";
import {
  useAccount,
  useConnect,
  useConnectors,
  useDisconnect,
  useReadContract,
  WagmiProvider,
} from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        <TotalSupply />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function TotalSupply() {
  const { data, isLoading, error } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "totalSupply",
  });

  if (isLoading) return <div>Loading total supply...</div>;
  if (error) return <div>Error fetching total supply</div>;
  return <div>Total Supply: {data?.toString()}</div>;
}

function ConnectWallet() {
  const { address } = useAccount();
  const connectors = useConnectors();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <div>
        You are connected with address: {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          onClick={() => {
            connect({ connector: connector });
          }}
        >
          Connect via {connector.name}
        </button>
      ))}
    </div>
  );
}

export default App;
