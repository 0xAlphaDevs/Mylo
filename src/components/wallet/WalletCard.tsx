"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { WalletCardProps } from "@/lib/dummydata";
import { CopyIcon } from "lucide-react";

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleViewWallet = () => {
    router.push(`/app/wallets/${wallet.id}`);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(wallet.account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Card className="shadow-md hover:shadow-xl">
      <CardContent className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2">
          <CardTitle>Mylo Wallet NFT {wallet.name}</CardTitle>
          <div className="flex items-center gap-2">
            <CardDescription>
              Account: {wallet.account}
            </CardDescription>
            <div
              onClick={handleCopyToClipboard}
            >
              {copied ? <CopyIcon className="text-green-500 h-4 w-4" /> : <CopyIcon className="text-gray-400 h-4 w-4" />}
            </div>
          </div>
        </div>
        <Button onClick={handleViewWallet}> View Wallet </Button>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
