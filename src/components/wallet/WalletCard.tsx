"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface WalletCardProps {
  wallet: {
    id: string;
    name: string;
    balance: string;
  };
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  const router = useRouter();

  const handleViewWallet = () => {
    router.push(`/app/wallets/${wallet.id}`);
  };

  return (
    <Card className="shadow-md">
      <CardContent className="flex justify-between items-center pt-4">
        <div className="flex flex-col gap-2">
          <CardTitle>{wallet.name}</CardTitle>
          <CardDescription>
            Balance: {wallet.balance}
          </CardDescription>
        </div>
        <Button onClick={handleViewWallet}> View Wallet </Button>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
