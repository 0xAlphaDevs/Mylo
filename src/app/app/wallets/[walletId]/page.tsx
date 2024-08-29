"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/Spinner";

interface FormData {
  recipientAddress: string;
  amount: number;
}

const WalletOverview = () => {
  const router = useRouter();
  const { walletId } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [nftAccount, setNftAccount] = useState<any>();
  const [isAccountActive, setIsAccountActive] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const { address, chainId, chain } = useAccount();
  const signer = useEthersSigner({ chainId: chainId });
  const [formData, setFormData] = useState<FormData>({
    recipientAddress: "",
    amount: 0,
  });

  const tokenboundClient = new TokenboundClient({
    signer,
    chain: chain,
  });

  const { data: balance, isLoading } = useBalance({ address: nftAccount });

  const handleGoBackToWallets = () => {
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
    setIsCreating(true);
    toast({
      description: "Activating your NFT Wallet...",
      variant: "default",
    });
    try {
      console.log("Creating account", myloWalletNFTAddress, walletId);
      const createdAccount = await tokenboundClient.createAccount({
        tokenContract: myloWalletNFTAddress as `0x${string}`, // nft token contract address
        tokenId: walletId as string,
      });
      console.log(createdAccount);
      toast({
        title: "NFT Wallet Activated!",
        description: "Your account has been created successfully",
        duration: 3000,
        variant: "success",
      });
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        title: "Error",
        description:
          "There was an issue creating the account. Please try again.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  }, [tokenboundClient]);

  const transferETH = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tokenboundClient || !address || !nftAccount) return;

    setIsTransferring(true);
    try {
      const executedTransfer = await tokenboundClient.transferETH({
        account: nftAccount,
        recipientAddress: formData.recipientAddress as `0x${string}`,
        amount: Number(formData.amount),
      });

      toast({
        title: "Transfer Successful",
        description: `Sent ${formData.amount} ETH to ${formData.recipientAddress}`,
        duration: 3000,
        variant: "success",
      });
    } catch (error) {
      console.error("Transfer failed", error);
      toast({
        title: "Transfer Failed",
        description: "There was an issue with the transaction. Please try again.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsTransferring(false);
      setFormData({
        recipientAddress: "",
        amount: 0,
      });
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const handleResetForm = () => ({
    recipientAddress: "",
    amount: "",
  });

  if (isLoading) {
    return (
      <div className=" pt-8 px-12">
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
      </div>
    );
  }

  return (
    <div className=" pt-8 px-12">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-medium">Wallet Overview</div>
        <Button
          onClick={handleGoBackToWallets}
          variant="outline"
          className="font-semibold"
        >
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
                    <Image
                      src="/etherscan.png"
                      width={15}
                      height={15}
                      alt="Logo"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm text-center">
                      View on block explorer
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        {isAccountActive ? (
          <div className="flex gap-8 items-center justify-center">
            <Button>Connect Wallet to Dapp</Button>
            {/* transfer ETH */}
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleResetForm}>Transfer ETH</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Transfer ETH</DialogTitle>
                  <DialogDescription>
                    Enter the required details to transfer ETH.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={transferETH}>
                  {!isTransferring && (
                    <>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="recipientAddress" className="text-right">
                            Recipient Address
                          </Label>
                          <Input
                            id="recipientAddress"
                            type="text"
                            placeholder="0x..."
                            className="col-span-3"
                            value={formData.recipientAddress}
                            onChange={(e: { target: { value: any } }) =>
                              setFormData({
                                ...formData,
                                recipientAddress: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            placeholder="0.00"
                            className="col-span-3"
                            type="number"
                            value={formData.amount}
                            onChange={(e: { target: { value: any } }) =>
                              setFormData({
                                ...formData,
                                amount: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Transfer ETH
                      </Button>
                    </>
                  )}
                  {isTransferring && (
                    <div className=" flex flex-col gap-3 items-center justify-center mt-4 text-center ">
                      <Spinner />
                      <p className="text-sm font-semibold text-muted-foreground">Transfer in progress....</p>
                    </div>
                  )}
                </form>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="flex gap-8 items-center justify-center">
            <Button onClick={handleWalletCreate} disabled={isCreating}>
              Activate NFT Wallet
            </Button>
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
