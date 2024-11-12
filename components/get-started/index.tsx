import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import SwapText from "../swap-text";

export const GetStarted = () => {
  return (
    <section className="mx-auto px-6 py-20 flex flex-col md:flex-row sm:py-28 lg:gap-x-24 lg:px-20 lg:py-20">
      <div className="flex-1">
        <Image
          src="/get-started.png"
          className=""
          alt="get-started"
          height={420}
          width={490}
        />
      </div>

      <div className="space-y-7 flex-1">
        <h3 className="font-bold text-[26px] lg:text-[3.375rem] lg:max-w-[500px] leading-[31.2px] lg:leading-[64.8px] mb-2">
          Get Started with the Right Investment
        </h3>

        <div className="flex flex-col gap-9">
          <SwapText
            initialContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-[22px] lg:text-4xl">
                  Increase Value for Money
                </span>
                <ArrowUpRight className="w-12 h-12" />
              </div>
            }
            finalContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-[22px] lg:text-4xl">
                  Increase Value for Money
                </span>
                <ArrowUpRight className="w-12 h-12 ml-[90px]" />
              </div>
            }
          />

          <SwapText
            initialContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-[22px] lg:text-4xl">
                  Achieving Financial Freedom
                </span>
                <ArrowUpRight className="w-12 h-12" />
              </div>
            }
            finalContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-[22px] lg:text-4xl">
                  Achieving Financial Freedom
                </span>
                <ArrowUpRight className="w-12 h-12 ml-10" />
              </div>
            }
          />

          <SwapText
            initialContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-[22px] lg:text-4xl">
                  Market Knowledge
                </span>
                <ArrowUpRight className="w-12 h-12" />
              </div>
            }
            finalContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-[22px] lg:text-4xl">
                  Market Knowledge
                </span>
                <ArrowUpRight className="w-12 h-12 ml-[210px]" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};
