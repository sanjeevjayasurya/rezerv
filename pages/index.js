import {
  useContract,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useSigner,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Form from "../components/Form";
import disperseContractABI from "../abi/disperseContractABI.json";
import { BigNumber, ethers } from "ethers";

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

  const { disconnect } = useDisconnect();

  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const total = 0.01
  function disperseEth() {
    contract.disperseEther(
      ["0x4aD946FFb7C197c670A46CBE93fE98176A3A4375"],
      [ethers.utils.parseUnits('0.01', 18)], 
      {
        gasLimit: '5000000',
        value: ethers.utils.parseEther(total.toString())
      }
    );
  }

  const onSubmit = () => {
    console.log("Rezerv initiated");
    disperseEth();
  };

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
        <br />
        <br />
        <Form onSubmit={onSubmit} />
      </>
    );
  else if (isConnecting) return <div>Wallet is connecting..</div>;
  return <button onClick={() => connect()}>Connect Wallet</button>;
}
