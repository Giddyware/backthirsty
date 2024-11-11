import Image from "next/image";

export const CalculateEarnings = () => {
  return (
    <section className="mx-auto px-6 py-20 flex sm:py-28 gap-24 lg:px-20 lg:py-20">
      <div className="flex-1">
        <Image
          src="/calculator.png"
          className=""
          alt="calculator"
          height={420}
          width={490}
        />
      </div>
      <div className="space-y-7 flex-1">
        <h3 className="font-bold text-left text-5xl max-w-xl mx-auto mb-12">
          Calculate Now and Discover Your Potential Earnings
        </h3>

        <p className="text-[#7A7A7A] max-w-[540px] text-[24px] leading-[29.04px]">
          Use our investment calculator to see how much you could have earned
          from past investments in stocks and cryptocurrencies. Simply fill in
          the details and uncover the potential growth of your portfolio.&quot;
        </p>
      </div>
    </section>
  );
};
