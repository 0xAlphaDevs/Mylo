"use client";

import { Card } from "@/components/ui/card";
import CreateWallet from "@/components/wallet/CreateWallet";
import WalletCard from "@/components/wallet/WalletCard";
import { WalletIcon } from "lucide-react";
import React from "react";
import { useAccount, useBalance } from "wagmi";
import { dummyWallets, Wallet } from "@/lib/dummydata";

const Wallets = () => {
  const { address } = useAccount();
  const { data } = useBalance({ address: address });

  const wallets: Wallet[] = dummyWallets;

  return (
    <div>
      {wallets.length > 0 ? (
        <div className="flex flex-col gap-4 px-12 pt-8">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl"> Wallets</p>
            <CreateWallet />
          </div>
          <div className="flex flex-col gap-4 pt-8">
            {wallets.map(wallet => (
              <WalletCard key={wallet.id} wallet={wallet} />
            ))}
          </div>
        </div>
      ) : (
        <div className="px-80 py-28">
          <Card className="shadow-md">
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="font-light text-xl text-muted-foreground">
                X wallets are represented as NFTs
              </p>
              <WalletIcon className="h-20 w-28 text-muted-foreground font-light" />
              <CreateWallet />
            </div>
          </Card>
        </div>
      )}
    </div>
  )
};

export default Wallets;
