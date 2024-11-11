import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export const Newsletter = () => {
  return (
    <section className="px-24 py-16">
      <div className="relative bg-[#0D1B1A] pt-16 pb-11 rounded-xl space-y-10">
        <div className="absolute left-0 bottom-0">
          <Image src="/circle.png" alt="description" width={200} height={200} />
        </div>
        <div className="absolute right-0 -top-10">
          <Image
            src="/circle-2.png"
            alt="description"
            width={200}
            height={200}
          />
        </div>
        <div className="space-y-5">
          <h2 className="text-4xl font-bold text-white text-center text-[3.375rem]">
            Join Our Newsletter
          </h2>
          <p className="text-[#B6B6B6] text-center max-w-[420px] mx-auto text-lg">
            Subscribe to our newsletter and get notified when we ship new
            features
          </p>
        </div>
        <form className="flex gap-6 items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-4 py-2 border border-gray-300 rounded-md w-[330px]"
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
