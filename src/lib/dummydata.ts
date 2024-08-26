export interface Wallet {
  id: string;
  name: string;
  balance: string;
}

export const dummyWallets: Wallet[] = [
  { id: "1", name: "Wallet 1", balance: "2.5 ETH" },
  { id: "2", name: "Wallet 2", balance: "0.75 ETH" },
  { id: "3", name: "Wallet 3", balance: "1.2 ETH" },
];
