import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import SwapText from "../swap-text";

export const GetStarted = () => {
  return (
    <section className="mx-auto px-6 py-20 flex sm:py-28 gap-24 lg:px-20 lg:py-20">
      <Image
        src="/get-started.png"
        className=""
        alt="get-started"
        height={420}
        width={490}
      />
      <div className="space-y-7">
        <h3 className="font-bold text-left text-5xl max-w-xl mx-auto mb-12">
          Get Started with the Right Investment
        </h3>

        <div className="flex flex-col gap-9">
          <SwapText
            initialContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-4xl">Increase Value for Money</span>
                <ArrowUpRight className="w-12 h-12" />
              </div>
            }
            finalContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-4xl">Increase Value for Money</span>
                <ArrowUpRight className="w-12 h-12 ml-[90px]" />
              </div>
            }
          />

          <SwapText
            initialContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-4xl">Achieving Financial Freedom</span>
                <ArrowUpRight className="w-12 h-12" />
              </div>
            }
            finalContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-4xl">Achieving Financial Freedom</span>
                <ArrowUpRight className="w-12 h-12 ml-10" />
              </div>
            }
          />

          <SwapText
            initialContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-4xl">Market Knowledge</span>
                <ArrowUpRight className="w-12 h-12" />
              </div>
            }
            finalContent={
              <div className="flex justify-between items-center w-full">
                <span className="text-4xl">Market Knowledge</span>
                <ArrowUpRight className="w-12 h-12 ml-[210px]" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};
