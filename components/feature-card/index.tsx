import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HeavyReturnsIcon, InflationProtectionIcon, LongTermGrowthIcon } from "../icons";
import type { Feature, FeatureCardProps } from "./types";

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  href = "#" 
}) => {
  return (
    <article className="py-8 px-5 bg-white text-center flex-1 border border-gray-200 rounded-lg shadow">
      <div className="flex items-center flex-col mb-6">
        <span aria-hidden="true">{icon}</span>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="text-[#838383] max-w-[290px] mx-auto mb-6">{description}</p>
      <div className="flex justify-center w-full">
        <Link
          href={href}
          className="group flex items-center justify-center gap-1 px-6 py-3 underline hover:no-underline text-black hover:cursor-pointer hover:text-black/75"
          aria-label={`Learn more about ${title}`}
        >
          <span>Learn more</span>
          <ArrowUpRight className="w-4 h-4 opacity-75 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105 group-hover:text-black group-hover:opacity-100" />
        </Link>
      </div>
    </article>
  );
};

const FEATURES: Feature[] = [
  {
    title: "Heavy Returns",
    description: "Investing in stocks and cryptocurrency offers the potential for substantial returns.",
    icon: <HeavyReturnsIcon />,
  },
  {
    title: "Long Term Growth",
    description: "Long-term investments in stocks and cryptocurrencies can lead to impressive growth.",
    icon: <LongTermGrowthIcon />,
  },
  {
    title: "Inflation Protection",
    description: "Investing in stocks and cryptocurrency offers the potential for substantial returns.",
    icon: <InflationProtectionIcon />,
  },
];

export const CardContainer: React.FC = () => {
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

export default FeatureCard;
