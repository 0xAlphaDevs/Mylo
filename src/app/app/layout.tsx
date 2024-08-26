import Navbar from "@/components/Navbar"
import { CircleDollarSignIcon, LayoutDashboardIcon, RepeatIcon, WalletIcon } from "lucide-react";

const links = [
  {
    href: "/app/wallets",
    text: "My Wallets",
    image: <WalletIcon className="h-6 w-6" />,

  },
  {
    href: "/app/bridge",
    text: "Bridge",
    image: <RepeatIcon className="h-6 w-6" />,

  },
  {
    href: "/app/marketplace",
    text: "Marketplace",
    image: <LayoutDashboardIcon className="h-6 w-6" />,
  },

];

export default function Creator({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="">
      <Navbar links={links} />
      <div className=""> {children}</div>
    </section>
  )
}