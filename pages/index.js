import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Form from "../components/form";
import { useEffect } from "react";
import { Hero } from "../components/Hero";
import Balance from "../components/Balance";

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

  async function connectWallet() {
    try {
      await connect();
      localStorage.setItem("isWalletConnected", true);
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnectWallet() {
    try {
      await disconnect();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  const { disconnect } = useDisconnect();

  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  const onSubmit = () => console.log('Submitting')

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        console.log("true");
        try {
          await connect();
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  // if (isConnected)
    return (
      <>
        <Hero />
        {/* <Balance /> */}
        {/* <div className="bg-white">
          Connected to {address}
          <button
            className="font-bold border-[1px]"
            onClick={() => disconnectWallet()}
          >
            Disconnect
          </button>
        </div> */}
        {/* <br />
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
        <br />
        <br /> */}
        {/* <Form onSubmit={onSubmit} /> */}
      </>
    );
  // else if (isConnecting) return <div>Wallet is connecting..</div>;
  // return <button onClick={() => connectWallet()}>Connect Wallet</button>;
}
