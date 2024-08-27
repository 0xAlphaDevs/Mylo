"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { dummyWallets } from "@/lib/dummydata";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const WalletOverview = () => {
  const router = useRouter();
  const { walletId } = useParams();
  const [copied, setCopied] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const wallet = dummyWallets.find(wallet => wallet.id === walletId) || {
    id: walletId,
    name: `Wallet ${walletId}`,
    account: "Unknown",
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(wallet.account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className=" pt-8 px-12">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-medium">Wallet Overview</div>
        <Button onClick={handleBackClick} variant='outline'>Go back to Wallets</Button>
      </div>
      <div className=" flex justify-between py-8">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-medium">Mylo Wallet NFT {wallet.name}</div>
          <div className="flex items-center gap-2">
            <div className="text-md text-muted-foreground">
              Account: {wallet.account}
            </div>
            <div
              onClick={handleCopyToClipboard}
            >
              {copied ? <CopyIcon className="text-green-500 h-4 w-4" /> : <CopyIcon className="text-gray-400 h-4 w-4" />}
            </div>
          </div>
        </div>
        <div className="flex gap-8 items-center justify-center">
          <Button >Connect Wallet to Dapp</Button>
          <Button >Transfer Tokens</Button>
        </div>
      </div>
      <div className="flex justify-between gap-8">
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>Token Balances</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center text-md">
            <p> ETH</p>
            <p>0 ETH</p>
          </CardContent>
        </Card>
        <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>Points Earned</CardTitle>
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
