"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { MoveLeftIcon } from "lucide-react";
import { dummyWallets } from "@/lib/dummydata";

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
    <div className="py-8 px-80">
      <div className="flex justify-between items-center mb-8">
        <div
          className="h-6 w-6 cursor-pointer mr-2"
          onClick={handleBackClick}
        >
          <MoveLeftIcon className="h-6 w-6" />
        </div>
        <div className="text-3xl font-medium">Wallet Overview</div>
        <div></div>
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
