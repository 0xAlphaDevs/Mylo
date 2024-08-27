"use client";
import React from "react";
import { useAccount, useBalance } from "wagmi";

const Test = () => {
  const { address } = useAccount();
  const { data } = useBalance({ address: address });
  return <div>Test : {data?.formatted}</div>;
};

export default Test;
