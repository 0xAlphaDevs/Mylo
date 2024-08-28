"use client";
import React, { useEffect, useCallback } from "react";
import { useAccount, useBalance } from "wagmi";
import { TokenboundClient } from "@tokenbound/sdk";
import { useEthersSigner } from "@/hooks";
import { arbitrumSepolia } from "viem/chains";

const recipientAddress = "0x5C4185b8cCA5198a94bF2B97569DEb2bbAF1f50C";
const myloWalletNFTAddress = "0x89a70127E090544eA55510F3bF4dBAF027F7c5Dd";

const Test = () => {
  const { isConnected, address } = useAccount();
  const signer = useEthersSigner({ chainId: 421_614 });
  // or useSigner() from legacy wagmi versions: const { data: signer } = useSigner()

  const tokenboundClient = new TokenboundClient({
    signer,
    chain: arbitrumSepolia,
  });

  const createAccount = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    const createdAccount = await tokenboundClient.createAccount({
      tokenContract: myloWalletNFTAddress, // nft token contract address
      tokenId: "0",
    });

    console.log(createdAccount);
  }, [tokenboundClient]);

  const transferETH = async () => {
    if (!tokenboundClient || !address) return;
    const executedTransfer = await tokenboundClient.transferETH({
      account: "0x37377808534632Ff7237cC8Eb46C8b1E0D7661a1", // for mylo wallet #0
      recipientAddress: recipientAddress,
      amount: 0.001,
    });
    executedTransfer && alert(`Sent ${0.001} ETH to ${recipientAddress}`);
  };

  const getAccount = async () => {
    const account = await tokenboundClient.getAccount({
      tokenContract: myloWalletNFTAddress,
      tokenId: "0",
    });

    console.log(account);
  };

  return (
    <div>
      Test Page
      <br />
      <button onClick={getAccount}>Get Account</button>
      <br />
      <button onClick={createAccount}>Create Account</button>
      <br />
      <button onClick={transferETH}>Transfer ETH</button>
    </div>
  );
};

export default Test;
