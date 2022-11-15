import { useAccount, useBalance } from "wagmi";
import { Container } from "../components/Container";
import Form from "../components/form";

export default function Disperse() {
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
      <Form / >
    </Container>
  );
}
