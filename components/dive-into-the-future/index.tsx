import Image from "next/image";
import { Button } from "../ui/button";

export const DiveIntoTheFuture = () => {
  return (
    <section className="mx-auto px-6 py-20 flex flex-col md:flex-row sm:py-28 lg:gap-x-24 lg:px-20 lg:py-20 space-y-10 md:space-y-0">
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-2xl md:text-3xl lg:text-[3.375rem] lg:max-w-[500px] leading-8 md:leading-10 lg:leading-[64.8px] mb-2">
          Dive into the Future with Crypto Investments
        </h3>
        <p className="text-[#7A7A7A] max-w-[450px] text-base md:text-lg lg:text-xl leading-6 md:leading-7 lg:leading-[29.04px]">
          Cryptocurrency offers high potential returns. By investing in digital
          assets you can diversify your portfolio and participate in the growth
          of the digital economy.
        </p>

        <Button className="bg-transparent border border-[#525252] w-44 mt-auto">
          Learn more
        </Button>
      </div>
      <div className="flex-1">
        <Image
          src="/dive-into-the-future.png"
          className=""
          alt="dive-into-the-future"
          height={410}
          width={490}
        />
      </div>
    </section>
  );
};
