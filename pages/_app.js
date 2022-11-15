import "../styles/globals.css";
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Header } from "../components/Header";
import WalletConnectContextProvider, {
  WalletConnectContext,
} from "../components/context/WalletConnect";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: "3kjfXvjS0nFwCtRf_aV17JcDIR7k4WvO" }),
  publicProvider(),
]);

const client = createClient({
  connectors: [new InjectedConnector({ chains })],
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <WalletConnectContextProvider>
        <Header />
        <Component {...pageProps} />
      </WalletConnectContextProvider>
    </WagmiConfig>
  );
}

export default MyApp;
