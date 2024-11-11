import { CardContainer } from "../feature-card";

export const FeaturesSection = () => {
  return (
    <section className="mx-auto px-6 py-20 sm:py-28 lg:items-center lg:gap-x-10 lg:px-8 lg:py-20">
      <h3 className="text-center font-bold text-5xl max-w-2xl mx-auto mb-12">
        Why You Should Start Investing Now
      </h3>
      <CardContainer />
    </section>
  );
};
