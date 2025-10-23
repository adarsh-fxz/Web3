import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  http,
  createConfig,
  WagmiProvider,
  useConnect,
  useAccount,
  useBalance,
  useSendTransaction,
} from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

function App3() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function MyAddress() {
  const { address } = useAccount();
  const balance = useBalance({ address });

  return (
    <div>
      Your address: {address} <br /> Your balance: {balance?.data?.formatted}{" "}
      ETH
    </div>
  );
}

function WalletConnector() {
  const { connectors, connect, isPending, error } = useConnect();

  return (
    <>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
        >
          {connector.name}
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </>
  );
}

function EthSend() {
  const { data: hash, sendTransaction } = useSendTransaction();

  function sendEth() {
    sendTransaction({
      to: document.getElementById("address").value,
      value: "100000000000000000",
    });
  }

  return (
    <>
      <input id="address" type="text" placeholder="Address..." />
      <button onClick={sendEth}>Send 0.1 ETH</button>
      {hash && <div>Transaction hash: {hash}</div>}
    </>
  );
}

export default App3;
