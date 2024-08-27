"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { MoveLeftIcon } from "lucide-react";
import { dummyWallets } from "@/lib/dummydata";
import { Button } from "@/components/ui/button";

const WalletOverview = () => {
  const router = useRouter();
  const { walletId } = useParams();

  const handleBackClick = () => {
    router.back();
  };

  const wallet = dummyWallets.find(wallet => wallet.id === walletId) || {
    id: walletId,
    name: `Wallet ${walletId}`,
    balance: "Unknown",
  };

  return (
    <div className=" pt-8 px-12">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-medium">Wallet Overview</div>
        <Button onClick={handleBackClick}>Go back to Wallets</Button>
      </div>
      <div className="shadow-md p-8">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-semibold">{wallet.name}</div>
          <div className="text-lg text-muted-foreground mt-2">Balance: {wallet.balance}</div>
        </div>
      </div>
    </div>
  );
};

export default WalletOverview;
