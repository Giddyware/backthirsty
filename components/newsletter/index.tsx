import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export const Newsletter = () => {
  return (
    <section className="px-6 py-8 lg:py-16 md:px-24">
      <div className="relative bg-[#0D1B1A] pt-16 pb-11 rounded-xl space-y-10 overflow-hidden">
        <div className="absolute left-0 bottom-0" aria-hidden="true">
          <Image 
            src="/circle.png" 
            alt="" 
            width={200} 
            height={200}
            className="w-[70px] h-[70px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]" 
          />
        </div>
        <div className="absolute right-0 -top-10" aria-hidden="true">
          <Image
            src="/circle-2.png"
            alt=""
            width={200}
            height={200}
            className="w-[70px] h-[70px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
          />
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
            Join Our Newsletter
          </h2>
          <p className="text-[#B6B6B6] text-center max-w-[420px] mx-auto text-sm md:text-base lg:text-lg">
            Subscribe to our newsletter and get notified when we ship new
            features
          </p>
        </div>
        <form className="flex flex-col gap-6 items-center justify-center md:flex-row px-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-3 py-2 md:w-[280px] lg:w-[330px] md:px-4 border border-gray-300 rounded-md"
          />
          <Button className="px-4 py-2 text-black flex rounded-md bg-[#40EE70]">
            <span>Subscribe</span>
            <ArrowUpRight className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </section>
  );
};
