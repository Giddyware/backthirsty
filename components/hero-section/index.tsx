"use client";

import { Navigation } from "../navigation";
import { BackgroundPattern } from "../background-pattern";
import { CalculatorTabs } from "../calculator/calculator-tabs";

export const HeroSection = () => {
  return (
    <div className="relative">
      <Navigation />
      <div className="relative isolate pt-14 bg-[#0D1B1A] overflow-y-hidden">
        <BackgroundPattern />
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-20 min-h-[780px]">
          <div className="mx-auto max-w-4xl lg:mx-0 lg:flex-1">
            <h1 className="mt-10 max-w-lg text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white">
              Back Testing For Normal People
            </h1>
            <p className="mt-6 text-base md:text-lg lg:text-xl leading-8 text-white max-w-[542px]">
              See how much you could have made with past investments in stocks and cryptocurrency
            </p>
            <div className="mt-10">
              <a href="#" className="rounded-md bg-[#40EE70] px-10 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#40EE70/10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#40EE70]">
                Subscribe to Newsletter
              </a>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow w-full lg:flex-1">
            <CalculatorTabs />
          </div>
        </section>
      </div>
    </div>
  );
};
