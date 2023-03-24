import { Container } from "./Container";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function Hero() {
  const router = useRouter();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess: () => {
      localStorage.setItem("isWalletConnected", true);
      router.push("/disperse");
    },
  });

  function connectWallet() {
    try {
      connect();
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnectWallet() {
    try {
      await disconnect();
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await connect();
          router.push("/disperse");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  const { disconnect } = useDisconnect({
    onSuccess: () => {
      localStorage.setItem("isWalletConnected", false);
    },
  });

  return (
    <Container className="pt-20 pb-16 text-center lg:pt-32">
      <h1
        className={`mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-[#fce303] sm:text-7xl`}
      >
        Rezerv
      </h1>
      <p
        className={`mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-400`}
      >
        Distribute assets with less gas fees
      </p>
      <div className={`mt-10 flex justify-center gap-x-6`}>
        <button
          type="nes-button"
          onClick={connectWallet}
          class="nes-btn"
        >
          Connect Wallet
        </button>
      </div>
      <div class="absolute bottom-0">
        <p class="nes-balloon from-left nes-pointer absolute w-[420px] top-[-100px] left-[80px]">
          Please connect wallet to continue
        </p>
        <img src="/sans100.png" alt="undertale" />
      </div>
    </Container>
  );
}
