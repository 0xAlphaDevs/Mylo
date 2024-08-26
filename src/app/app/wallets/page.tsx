"use client";
import React from "react";
import { useAccount, useBalance } from "wagmi";

const Wallets = () => {
  const { address } = useAccount();
  const { data } = useBalance({ address: address });
  return <div>Wallets : {data?.formatted}</div>;
};

export default Wallets;
