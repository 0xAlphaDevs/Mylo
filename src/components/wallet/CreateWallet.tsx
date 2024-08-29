"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useAccount, useWriteContract } from "wagmi";
import { useToast } from "../ui/use-toast";
import { address, abi } from "@/lib/contracts/MyloWalletNFT.json";

const CreateWallet = () => {
  const { address: walletAddress } = useAccount();
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
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
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create wallet",
      });
    }
  };

  useEffect(() => {
    if (isPending) {
      toast({
        variant: "default",
        description: "MyloWallet NFT minting is in progress...",
      });
    }
  }, [isPending]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "success",
        title: "NFT Minted !!",
        description: "MyloWallet NFT minted successfully!",
      });
    }
  }, [isSuccess]);

  return (
    <div>
      <Button className="rounded-[10px] font-semibold" onClick={handleNFTmint}>
        + Mint MyloWallet NFT
      </Button>
    </div>
  );
};

export default CreateWallet;
