export interface Wallet {
  id: string;
  name: string;
  account: string;
}

export const dummyWallets: Wallet[] = [
  { id: "1", name: "14567", account: "0x173928474578299347" },
  { id: "2", name: "2674", account: "0x173928474578299347" },
  { id: "3", name: "34987", account: "0x1478299347" },
];

export interface WalletCardProps {
  wallet: {
    id: string;
    name: string;
    account: string;
  };
}
