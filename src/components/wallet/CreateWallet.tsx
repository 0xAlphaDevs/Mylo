"use client";

import React from "react";
import { Button } from "../ui/button";
import { useAccount, useWriteContract } from "wagmi";
import { useToast } from "../ui/use-toast";
import { address, abi } from "@/lib/contracts/MyloWalletNFT.json";

const CreateWallet = () => {
  const { address: walletAddress } = useAccount();
  const { toast } = useToast();

  const {
    isPending: isTxnPending,
    isSuccess: isTxnSuccess,
    writeContract,
  } = useWriteContract();

  const handleNFTmint = async () => {
    try {
      writeContract({
        address: address as `0x${string}`,
        abi: abi,
        functionName: "safeMint",
        args: [walletAddress],
      });
      toast({
        variant: "success",
        description: "Wallet created successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create wallet",
      });
    }
  };

  return (
    <div>
      <Button className="rounded-[10px] font-semibold" onClick={handleNFTmint}>
        + Mint MyloWallet NFT
      </Button>
    </div>
  );
};

export default CreateWallet;
