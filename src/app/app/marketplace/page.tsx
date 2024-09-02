import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface NFTCard {
  id: number;
  title: string;
  image: string;
  price: number;
  creator: string;
  category: string;
}

const nfts: NFTCard[] = [
  {
    id: 1,
    title: "Abstract Harmony",
    image: "/logo.png?height=200&width=400",
    price: 0.5,
    creator: "Artist1",
    category: "art",
  },
  {
    id: 2,
    title: "Digital Dreams",
    image: "/logo.png?height=400&width=400",
    price: 0.7,
    creator: "Artist2",
    category: "photography",
  },
  {
    id: 3,
    title: "Neon Nights",
    image: "/logo.png?height=400&width=400",
    price: 0.3,
    creator: "Artist3",
    category: "music",
  },
  {
    id: 4,
    title: "Pixel Paradise",
    image: "/logo.png?height=400&width=400",
    price: 0.6,
    creator: "Artist4",
    category: "art",
  },
  {
    id: 5,
    title: "Crypto Cats",
    image: "/logo.png?height=400&width=400",
    price: 0.4,
    creator: "Artist5",
    category: "collectibles",
  },
  {
    id: 6,
    title: "Virtual Vistas",
    image: "/logo.png?height=400&width=400",
    price: 0.8,
    creator: "Artist6",
    category: "photography",
  },
];

const categories = ["all", "art", "photography", "music", "collectibles"];

export default function Component() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 backdrop-blur-xs bg-background/10 z-10"></div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* <Image src="/coming-soon.png" width={400} height={400} alt="Logo" /> */}
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-8 shadow-md w-full">
          <h1 className="text-xl font-bold">NFT Marketplace</h1>
          <p className="text-4xl font-semibold text-gray-500">Coming Soon</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 opacity-50">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">NFT Marketplace</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input className="pl-8" placeholder="Search NFTs" disabled />
            </div>
            <Avatar>
              <AvatarImage src="/user.png?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <Tabs defaultValue="all" className="mb-4">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize"
                disabled
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts
                  .filter(
                    (nft) => category === "all" || nft.category === category
                  )
                  .map((nft) => (
                    <Card key={nft.id} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <img
                          src={nft.image}
                          alt={nft.title}
                          className="w-full h-48 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle>{nft.title}</CardTitle>
                        <p className="text-sm text-gray-500">
                          Created by {nft.creator}
                        </p>
                        <p className="text-lg font-bold mt-2">
                          {nft.price} ETH
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between px-4">
                        <Button variant="outline" size="icon" disabled>
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button disabled>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
