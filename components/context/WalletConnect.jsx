import React, { createContext, useEffect } from "react";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const WalletConnectContext = createContext();

const WalletConnectContextProvider = (props) => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
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
  return (
    <WalletConnectContext.Provider>
      {props.children}
    </WalletConnectContext.Provider>
  );
};

export default WalletConnectContextProvider;
