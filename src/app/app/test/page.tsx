"use client";
import React, { useEffect, useCallback } from "react";
import { Core } from "@walletconnect/core";
import { Web3Wallet, Web3WalletTypes } from "@walletconnect/web3wallet";
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";

const walletConnectUri =
  "wc:ce0f9d497a007c1b9c37edd58df44c23515e3e60e0f30e708bd629b67fe3d0c3@2?expiryTimestamp=1725254851&relay-protocol=irn&symKey=adff5420845b2ab7935923b6165ee5130c422b55a846dc0434c52bbc7addd19b";

const Test = () => {
  const pair = async () => {
    const core = new Core({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    });

    const web3wallet = await Web3Wallet.init({
      core, // <- pass the shared `core` instance
    });

    await web3wallet.core.pairing.pair({
      uri: walletConnectUri,
    });

    async function onSessionProposal({
      id,
      params,
    }: Web3WalletTypes.SessionProposal) {
      try {
        // ------- namespaces builder util ------------ //
        const approvedNamespaces = buildApprovedNamespaces({
          proposal: params,
          supportedNamespaces: {
            eip155: {
              chains: ["eip155:42161"],
              methods: [
                "eth_accounts",
                "eth_requestAccounts",
                "eth_sendTransaction",
                "eth_sendRawTransaction",
                "eth_sign",
                "eth_signTransaction",
                "eth_signTypedData",
                "eth_signTypedData_v3",
                "eth_signTypedData_v4",
                "eth_sendTransaction",
                "personal_sign",
                "wallet_switchEthereumChain",
                "wallet_addEthereumChain",
                "wallet_getPermissions",
                "wallet_requestPermissions",
                "wallet_registerOnboarding",
                "wallet_watchAsset",
                "wallet_scanQRCode",
                "wallet_sendCalls",
                "wallet_getCapabilities",
                "wallet_getCallsStatus",
                "wallet_showCallsStatus",
              ],
              events: [
                "chainChanged",
                "accountsChanged",
                "message",
                "disconnect",
                "connect",
              ],
              accounts: [
                "eip155:42161:0x5cd38dd13bf453b9ce114c4e2c380e870a0abe56",
              ],
            },
          },
        });
        // ------- end namespaces builder util ------------ //

        const session = await web3wallet.approveSession({
          id,
          namespaces: approvedNamespaces,
        });

        console.log("session", session);
      } catch (error) {
        // use the error.message to show toast/info-box letting the user know that the connection attempt was unsuccessful
      }
    }

    web3wallet.on("session_proposal", onSessionProposal);
  };

  return (
    <div>
      Test Page
      <br />
      <button onClick={pair}>Pair</button>
    </div>
  );
};

export default Test;
