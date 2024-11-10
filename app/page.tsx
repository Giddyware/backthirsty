"use client";

import { CryptoPills } from "@/components/crypto/crypto-pills";
import { CardContainer } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            {/* <a href="#" className="-m-1.5 p-1.5"> */}
            <Image
              className="h-8 w-auto"
              src="/logo.png"
              alt=""
              width={32}
              height={32}
            />
            <span className="text-white">BackThirsty</span>
            {/* </a> */}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <FaBarsStaggered className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 bg-[#40EE70] px-10 py-3 rounded-sm"
            >
              Subscribe <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate pt-14 bg-[#0D1B1A] overflow-y-hidden">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] size-[20%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(13, 27, 26,1),rgba(255,255,255,0))]" />
        {/* <div className="absolute bottom-0 right-[-20%] top-[-10%] size-[20%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(13, 27, 26,1),rgba(255,255,255,0))]" /> */}
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-[#284137] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={100}
              height={100}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-[#10251e]">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-20 min-h-[780px]">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Back Testing For Normal People
            </h1>
            <p className="mt-6 text-lg leading-8 text-white max-w-[542px]">
              See how much you could have made with past investments in stocks
              and cryptocurrency
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="rounded-md bg-[#40EE70] px-10 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#40EE70/10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#40EE70]"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <Tabs
              defaultValue="stocks"
              className="w-[523px] rounded-[9px] bg-white pt-6 mx-auto"
            >
              <TabsList className="grid max-w-[368px] gap-3 bg-[#F0F0F0] rounded-[10px] p-[2.3px] mx-auto grid-cols-2">
                <TabsTrigger
                  className="inline-flex  items-center justify-center whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#14A83C] data-[state=active]:text-white data-[state=active]:shadow-sm"
                  value="stocks"
                >
                  Stocks
                </TabsTrigger>
                <TabsTrigger
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-medium ring-offset-background transition-all  duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#14A83C] data-[state=active]:text-white data-[state=active]:shadow-sm"
                  value="crypto"
                >
                  Crypto
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stocks">
                <Card className="border-none">
                  <CardHeader>
                    <CardTitle>Stocks</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when
                      you&rsquo;re done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 mx-auto w-full">
                    <div className="flex gap-6 flex-col w-full">
                      <div className="flex w-full gap-6">
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="ticker">Ticker</Label>
                          <Input id="ticker" placeholder="Enter ticker" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="amount_invested">
                            Amount Invested
                          </Label>
                          <Input id="amount_invested" placeholder="$0.00" />
                        </div>
                      </div>
                      <div className="flex w-full gap-6">
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="start_date">Start Date</Label>
                          <Input id="start_date" placeholder="Select Date" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="end_date">End Date</Label>
                          <Input id="end_date" placeholder="Select Date" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col">
                    {/* <div className='flex flex-col w-full'> */}
                    <Button size="full" variant="default">
                      Calculate
                    </Button>
                    <div className="space-y-1 mt-5 w-full">
                      <Label htmlFor="potential_earning">
                        Potential Earning
                      </Label>
                      <Input
                        id="potential_earning"
                        placeholder="$0.00"
                        className="w-full h-1[53px] lg:h-[75px]"
                      />
                    </div>
                    {/* </div> */}
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="crypto">
                <Card className="border-none">
                  <CardHeader>
                    <CardTitle>Crypto</CardTitle>
                    <CardDescription className="mx-auto">
                      <CryptoPills />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex gap-6 flex-col">
                      <div className="flex gap-6">
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="ticker">Ticker</Label>
                          <Input id="ticker" placeholder="Enter ticker" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="amount_invested">
                            Amount Invested
                          </Label>
                          <Input id="amount_invested" placeholder="$0.00" />
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="start_date">Start Date</Label>
                          <Input id="start_date" placeholder="Select Date" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="end_date">End Date</Label>
                          <Input id="end_date" placeholder="Select Date" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="full" variant="default">
                      Calculate
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
};
const FeaturesSection = () => {
  return (
    <section className="mx-auto px-6 py-20 sm:py-28 lg:items-center lg:gap-x-10 lg:px-8 lg:py-20">
      <h3 className="text-center font-bold text-5xl max-w-2xl mx-auto mb-12">
        Why You Should Start Investing Now
      </h3>
      <CardContainer />
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
