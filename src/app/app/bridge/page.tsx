"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAccount, useReadContract, useChainId } from "wagmi";
import {
  sepoliaAddress as myloWalletNFTAddress,
  abi,
} from "@/lib/contracts/MyloWalletNFT.json";
import {
  baseSepolia,
  arbitrumSepolia,
  sepolia,
  optimismSepolia,
} from "wagmi/chains";
import { Skeleton } from "@/components/ui/skeleton";
import { useWriteContract } from "wagmi";
import {
  abi as myloWalletNFTBridgeEntrypointABI,
  sepoliaAddress,
  arbitrumAddress,
} from "@/lib/contracts/MyloWalletNFTBridgeEntrypoint.json";

const availableChains = [
  // { id: baseSepolia.id, name: baseSepolia.name },
  { id: arbitrumSepolia.id, name: arbitrumSepolia.name },
  // { id: sepolia.id, name: sepolia.name },
  // { id: optimismSepolia.id, name: optimismSepolia.name },
];

function chainIdtoWormholeChainId(chainId: string | null): string {
  switch (chainId) {
    case "421614":
      return "10003";
    case "11155111":
      return "10002";
    default:
      return "1";
  }
}

function getBridgeEntrypointAddress(chainId: number): string {
  switch (chainId) {
    case 421614:
      return arbitrumAddress;
    case 11155111:
      return sepoliaAddress;
    default:
      return "0x";
  }
}

const Bridge = () => {
  const { address } = useAccount();
  const currentChainId = useChainId();
  const [nftWallets, setNftWallets] = useState<any[]>([]);
  const [selection, setSelection] = useState({
    nft: null,
    chain: null,
  });

  const { data: nftData, isLoading } = useReadContract({
    abi,
    address: myloWalletNFTAddress as `0x${string}`,
    functionName: "getAllMyloWalletNFTsForUser",
    args: [address],
  });

  const { data: cost } = useReadContract({
    address: "0xCCF31d992aa2616E47B1c0860fD1e4787892dF49",
    abi: myloWalletNFTBridgeEntrypointABI,
    functionName: "quoteCrossChainGreeting",
    args: [10003],
  });

  console.log(cost);

  const { isPending, isSuccess, error, writeContract } = useWriteContract();

  useEffect(() => {
    if (nftData) {
      setNftWallets(nftData as string[]);
    }
  }, [nftData]);

  const filteredChains = availableChains.filter((c) => c.id !== currentChainId);

  const handleSelectionChange = (field: string, value: string): any => {
    setSelection((prevSelection) => ({
      ...prevSelection,
      [field]: value,
    }));
  };

  const handleBridgeClick = async () => {
    const targetChain = chainIdtoWormholeChainId(selection.chain);
    const targetAddress = getBridgeEntrypointAddress(Number(selection.chain));

    const bridgeEntrypointAddress = getBridgeEntrypointAddress(currentChainId);

    console.log(
      targetChain,
      targetAddress,
      Number(selection.nft),
      bridgeEntrypointAddress,
      BigInt(Number(cost))
    );

    writeContract({
      address: bridgeEntrypointAddress as `0x${string}`,
      abi: myloWalletNFTBridgeEntrypointABI,
      functionName: "sendCrossChainMessage",
      args: [targetChain, targetAddress, selection.nft],
      value: BigInt(Number(cost)),
    });
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex justify-start">
          <Skeleton className="h-12 w-72 rounded-full" />
        </div>
        <div className="flex flex-col space-y-4 items-center mt-28 w-full">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-8 w-72 rounded-full" />
          </div>

          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-8 w-72 rounded-full" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex justify-start">
        <p className="text-3xl font-medium">Bridge MyloWallet NFT</p>
      </div>
      <div className="flex flex-col space-y-4 items-center mt-28 w-full">
        <div className="flex items-center space-x-4">
          <p className="font-semibold  pr-2">Select your NFT</p>
          <Select
            onValueChange={(value) => handleSelectionChange("nft", value)}
          >
            <SelectTrigger className="w-[400px]">
              <SelectValue placeholder="Select NFT" />
            </SelectTrigger>
            <SelectContent>
              {nftWallets.length > 0 ? (
                nftWallets.map((wallet) => (
                  <SelectItem key={wallet} value={wallet}>
                    MyloWallet NFT #{Number(wallet)}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="">
                  No NFTs available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <p className="font-semibold">Destination Chain</p>
          <Select
            onValueChange={(value) => handleSelectionChange("chain", value)}
          >
            <SelectTrigger className="w-[400px]">
              <SelectValue placeholder="Select Chain" />
            </SelectTrigger>
            <SelectContent>
              {filteredChains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  {chain.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          <Button className="mt-4" onClick={handleBridgeClick}>
            Bridge NFT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bridge;
