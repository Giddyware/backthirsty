import { FEATURES } from "./constants";
import { FeatureCard } from "./feature-card";

export const CardContainer = () => {
  return (
    <section className="flex mx-auto gap-[20px] items-start flex-wrap w-full px-4 sm:px-6 lg:px-8">
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.title}
          {...feature}
        />
      ))}
    </section>
  );
};
