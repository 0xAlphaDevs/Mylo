"use client";

import { Card, CardContent } from "@/components/ui/card";
import CreateWallet from "@/components/wallet/CreateWallet";
import WalletCard from "@/components/wallet/WalletCard";
import { WalletIcon } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useAccount, useBalance } from "wagmi";
import { useReadContract } from "wagmi";
import {
  address as myloWalletNFTAddress,
  abi,
} from "@/lib/contracts/MyloWalletNFT.json";
import { Skeleton } from "@/components/ui/skeleton";

const Wallets = () => {
  const { address } = useAccount();
  const [nftWallets, setNftWallets] = React.useState<any[]>([]);

  const { data: nftData, isLoading } = useReadContract({
    abi,
    address: myloWalletNFTAddress as `0x${string}`,
    functionName: "getAllMyloWalletNFTsForUser",
    args: [address],
  });

  useEffect(() => {
    console.log(nftData);
    if (nftData) {
      setNftWallets(nftData as string[]);
    }
  }, [nftData]);

  if (isLoading) {
    return <div>
      {/* {nftWallets.length > 0 ? ( */}
      <div className="flex flex-col gap-4 px-12 pt-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-40 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>
        <div className="flex flex-col gap-6 pt-8 ">
          <Card className="shadow-md hover:shadow-xl">
            <CardContent className="flex justify-between items-center pt-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-40 rounded-lg" />
                <Skeleton className="h-6 w-48 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-40 rounded-lg" />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-6 pt-8 ">
          <Card className="shadow-md hover:shadow-xl">
            <CardContent className="flex justify-between items-center pt-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-40 rounded-lg" />
                <Skeleton className="h-6 w-48 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-40 rounded-lg" />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-6 pt-8 ">
          <Card className="shadow-md hover:shadow-xl">
            <CardContent className="flex justify-between items-center pt-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-40 rounded-lg" />
                <Skeleton className="h-6 w-48 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-40 rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </div>
      {/* // ) : (
      //   <div className="px-80 py-28">
      //     <Card className="shadow-md">
      //       <div className="flex flex-col items-center justify-center gap-4 py-12">
      //         <Skeleton className="h-10 w-40 rounded-lg" />
      //         <Skeleton className="h-20 w-28 rounded-lg" />
      //         <Skeleton className="h-10 w-40 rounded-lg" />
      //       </div>
      //     </Card>
      //   </div>
      // )} */}
    </div>;
  }

  return (
    <div>
      {nftWallets.length > 0 ? (
        <div className="flex flex-col gap-4 px-12 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-medium"> Wallets</p>
            <CreateWallet />
          </div>
          <div className="flex flex-col gap-6 pt-8 ">
            {nftWallets.map((wallet) => (
              <WalletCard key={wallet.id} wallet={Number(wallet)} />
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
  );
};

export default Wallets;
