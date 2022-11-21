import { ethers } from "ethers";
import { useAccount, useBalance, useSigner, useContract } from "wagmi";
import { Container } from "../components/Container";
import Form from "../components/form";
import disperseContractABI from "../abi/disperseContractABI.json";

export default function Disperse() {

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

  const { address, isConnected, isConnecting, isDisconnected, status } =
    useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log("Connected", { address, connector, isReconnected });
      },
      onDisconnect() {
        console.log("Disconnected");
      },
    });
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  return (
    <Container>
      <div className="text-white text-center text-4xl">
        Connected to {address}
      </div>
      <div className="text-white text-center text-4xl">
        Balance: {data?.formatted} {data?.symbol}
      </div>
      <Form onSubmit={onSubmit} />
    </Container>
  );
}
