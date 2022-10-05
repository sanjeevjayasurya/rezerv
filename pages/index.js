import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  const { address, isConnected, isConnecting, isDisconnected, status } =
    useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log("Connected", { address, connector, isReconnected });
      },
      onDisconnect() {
        console.log("Disconnected");
      },
    });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  console.log(data);
  if (isConnected)
    return (
      <>
        <div>
          Connected to {address}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
        <br />
        <br />
        <div>
          {isLoading ? (
            <div>Fetching balance…</div>
          ) : isError ? (
            <div>Error fetching balance</div>
          ) : (
            <div>
              Balance: {data?.formatted} {data?.symbol}
            </div>
          )}
        </div>
      </>
    );
  else if (isConnecting) return <div>Wallet is connecting..</div>;
  return <button onClick={() => connect()}>Connect Wallet</button>;
}
