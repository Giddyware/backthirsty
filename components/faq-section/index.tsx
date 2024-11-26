import { FaqsAccordion } from "../accordion";

export const FaqSection = () => {
  return (
    <section className="mx-auto px-6 py-20 flex flex-col md:flex-row sm:py-28 lg:gap-x-24 lg:px-20 lg:py-20 space-y-10 md:space-y-0">
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-2xl md:text-3xl lg:text-[3.375rem] max-w-[500px] leading-8 md:leading-10 lg:leading-[64.8px] mb-2">
          Still Have Questions We’ve Got You Covered!
        </h3>
        <p className="text-[#7A7A7A] max-w-[540px] text-base md:text-lg lg:text-xl leading-6 md:leading-7 lg:leading-[29.04px]">
          Investing can be complex, but we&apos;re here to help. If you need
          more help,{" "}
          <span className="text-[#05A832] underline">our support team</span> is
          ready to assist you!
        </p>
      </div>
      <div className="flex-1">
        <FaqsAccordion />
      </div>
    </section>
  );
};
