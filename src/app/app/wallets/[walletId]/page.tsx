"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { useRouter, useParams } from "next/navigation";
import { dummyWallets } from "@/lib/dummydata";
import { Button } from "@/components/ui/button";
import { CopyIcon, FileCheckIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { TokenboundClient } from "@tokenbound/sdk";
import { useEthersSigner } from "@/hooks";
import { useAccount, useBalance } from "wagmi";
import {
  address as myloWalletNFTAddress,
  abi,
} from "@/lib/contracts/MyloWalletNFT.json";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const WalletOverview = () => {
  const router = useRouter();
  const { walletId } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [nftAccount, setNftAccount] = useState<any>();
  const [isAccountActive, setIsAccountActive] = useState(false);
  const { address, chainId, chain } = useAccount();
  const signer = useEthersSigner({ chainId: chainId });

  const tokenboundClient = new TokenboundClient({
    signer,
    chain: chain,
  });

  const { data: balance, isLoading } = useBalance({ address: nftAccount });

  const handleBackClick = () => {
    router.back();
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(nftAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const handleTransactionView = () => {
    router.push(chain?.blockExplorers?.default.url + `/address/${nftAccount}`);
  };

  const getAccount = async () => {
    const account = tokenboundClient.getAccount({
      tokenContract: myloWalletNFTAddress as `0x${string}`,
      tokenId: walletId as string,
    });
    const isAccountDeployed = await tokenboundClient.checkAccountDeployment({
      accountAddress: account,
    });
    setNftAccount(account);

    setIsAccountActive(isAccountDeployed);

    console.log(account);
  };

  const handleWalletCreate = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    console.log("Creating account", myloWalletNFTAddress, walletId);

    const createdAccount = await tokenboundClient.createAccount({
      tokenContract: myloWalletNFTAddress as `0x${string}`, // nft token contract address
      tokenId: walletId as string,
    });

    console.log(createdAccount);
    toast({
      title: "NFT Wallet Activated !",
      description: "Your account has been created successfully",
      duration: 3000,
      variant: "success",
    });
  }, [tokenboundClient]);

  // 🟡
  const transferETH = async () => {
    if (!tokenboundClient || !address) return;
    const executedTransfer = await tokenboundClient.transferETH({
      account: nftAccount, // for mylo wallet #0
      recipientAddress: "0x5C4185b8cCA5198a94bF2B97569DEb2bbAF1f50C", // TO DO: take input in modal 1. send to MyloWallet 2. send to custom address
      amount: 0.005, // TO DO: take input in modal
    });
    executedTransfer &&
      alert(
        `Sent ${0.001} ETH to ${"0x5C4185b8cCA5198a94bF2B97569DEb2bbAF1f50C"}`
      );
  };

  useEffect(() => {
    getAccount();
  }, []);

  if (isLoading) {
    return <div className=" pt-8 px-12">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-10 w-48 rounded-full" />
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>
      <div className=" flex justify-between py-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-60 rounded-full" />
          <Skeleton className="h-6 w-96 rounded-full" />
        </div>
        {isAccountActive ? (
          <div className="flex gap-8 items-center justify-center">
            <Skeleton className="h-10 w-40 rounded-lg" />
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>
        ) : (
          <div className="flex gap-8 items-center justify-center">
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>
        )}
      </div>
      <div className="flex justify-between gap-8">
        <Card className="w-[50%]">
          <CardHeader>
            <Skeleton className="h-6 w-32 rounded-full" />
          </CardHeader>
          <CardContent className="flex justify-between items-center text-md">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </CardContent>
        </Card>
        <Card className="w-[50%]">
          <CardHeader>
            <Skeleton className="h-6 w-32 rounded-full" />
          </CardHeader>
          <CardContent className="flex justify-center">
            <Skeleton className="h-48 w-52 rounded-lg" />
          </CardContent>
        </Card>
      </div>
    </div>;
  }

  return (
    <div className=" pt-8 px-12">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-medium">Wallet Overview</div>
        <Button onClick={handleBackClick} variant="outline" className="font-semibold">
          Go back to Wallets
        </Button>
      </div>
      <div className=" flex justify-between py-8">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-medium">MyloWallet NFT#{walletId}</div>
          <div className="flex items-center gap-2">
            <div className="text-md text-muted-foreground">
              Account:
              {nftAccount}
            </div>
            <div onClick={handleCopyToClipboard}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {copied ? (
                      <FileCheckIcon className="text-green-500 h-4 w-4" />
                    ) : (
                      <CopyIcon className="text-gray-400 h-4 w-4" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm text-center">Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div onClick={handleTransactionView}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Image src="/etherscan.png" width={15} height={15} alt="Logo" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm text-center">View on block explorer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        {isAccountActive ? (
          <div className="flex gap-8 items-center justify-center">
            <Button>Connect Wallet to Dapp</Button>
            <Button onClick={transferETH}>Transfer ETH</Button>
          </div>
        ) : (
          <div className="flex gap-8 items-center justify-center">
            <Button onClick={handleWalletCreate}>Activate NFT Wallet</Button>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-8">
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>Token Balances</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center text-md">
            <p> ETH</p>
            <p>{balance?.formatted} ETH</p>
          </CardContent>
        </Card>
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>My Loyalty Points</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image src="/coming-soon.png" width={150} height={150} alt="Logo" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletOverview;
