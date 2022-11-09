import {
  useContract,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useSigner,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Form from "../components/form";
import disperseContractABI from "../abi/disperseContractABI.json";
import { ethers } from "ethers";
import { useEffect } from "react";
import { Header } from "../components/Header";

export default function Home() {
  const {
    data: signer,
    isError: isSignerError,
    isLoading: isSignerLoading,
  } = useSigner();

  const contract = useContract({
    addressOrName: "0x9CC3Bc6cC9D22679EAd7b37716432881991C6B62",
    contractInterface: disperseContractABI,
    signerOrProvider: signer,
  });

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

  const onSubmit = (data) => {
    const addresses = data?.formData?.map((data) => data.address);
    const amounts = data?.formData?.map((data) => {
      return ethers.utils.parseEther(data.amount.toString());
    });
    const totalAmount = data.formData.reduce(
      (acc, data) => acc + parseFloat(data.amount),
      0
    );
    contract.disperseEther(addresses, amounts, {
      gasLimit: "5000000",
      value: ethers.utils.parseEther(totalAmount.toString()),
    });
  };

  if (isConnected)
    return (
      <>
        <Header />
        <div>
          Connected to {address}
          <button
            class="font-bold border-[1px]"
            onClick={() => disconnectWallet()}
          >
            Disconnect
          </button>
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
        <br />
        <br />
        <Form onSubmit={onSubmit} />
      </>
    );
  else if (isConnecting) return <div>Wallet is connecting..</div>;
  return <button onClick={() => connectWallet()}>Connect Wallet</button>;
}
