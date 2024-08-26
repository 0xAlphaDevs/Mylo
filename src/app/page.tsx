import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-12">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-bold text-2xl lg:flex">
        Mylo
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <Link href="/app">
            <Button>Launch App</Button>
          </Link>
        </div>
      </div>

      <div className="flex place-items-center ">
        <Image
          src="/logo.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">

      </div>
    </main>
  );
}
