import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="py-8 px-5 bg-white text-center flex-1 border border-gray-200 rounded-lg shadow">
      <div className="flex items-center flex-col mb-6">
        <span className="">{children}</span>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="text-[#838383] max-w-[290px] mx-auto mb-6">{description}</p>
      <div className="flex justify-center w-full">
        <Link
          href="#"
          className="group flex items-center justify-center gap-1 px-6 py-3 underline hover:no-underline text-black hover:cursor-pointer hover:text-black/75"
        >
          <span>Learn more</span>
          <ArrowUpRight className="w-4 h-4 opacity-75 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105 group-hover:text-black group-hover:opacity-100" />
        </Link>
      </div>
    </div>
  );
};

export const CardContainer: React.FC = () => {
  return (
    <div className="flex mx-auto gap-[20px] items-start flex-wrap w-full px-4 sm:px-6 lg:px-8">
      <FeatureCard
        title="Heavy Returns"
        description="Investing in stocks and cryptocurrency offers the potential for substantial returns."
      >
        <svg
          width="62"
          height="61"
          viewBox="0 0 62 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="61" height="61" rx="30.5" fill="#E3FFEA" />
          <path
            d="M30.9017 9.63089L26.9069 18.9301H22.9121C22.249 18.9301 21.6025 18.9798 20.9727 19.1124L22.6303 15.1342L22.6966 14.985L22.796 14.7197C22.8458 14.6037 22.8789 14.5043 22.9286 14.4214C24.8515 9.96241 27.0064 8.57002 30.9017 9.63089Z"
            fill="#05A832"
          />
          <path
            d="M42.1566 19.3776L42.1234 19.361C41.1289 19.0792 40.1177 18.93 39.09 18.93H28.7134L32.443 10.2607L32.4927 10.1447C32.7248 10.2276 32.9734 10.3436 33.2221 10.4265L36.8854 11.9681C38.9242 12.8135 40.3498 13.692 41.2283 14.7529C41.3775 14.9518 41.5101 15.1341 41.6427 15.3496C41.7919 15.5817 41.9079 15.8137 41.9742 16.0624C42.0406 16.2116 42.0903 16.3442 42.1234 16.4934C42.3721 17.3387 42.3886 18.3001 42.1566 19.3776Z"
            fill="#05A832"
          />
          <path
            d="M31.8628 35.2409H32.2772C32.7745 35.2409 33.1889 34.7934 33.1889 34.2464C33.1889 33.5502 32.99 33.4507 32.559 33.285L31.8628 33.0363V35.2409Z"
            fill="#05A832"
          />
          <path
            d="M41.4274 21.748C40.6814 21.5325 39.9024 21.4164 39.0901 21.4164H22.9119C21.7847 21.4164 20.7238 21.6319 19.7293 22.0629C16.845 23.3061 14.8228 26.1738 14.8228 29.5056V32.7379C14.8228 33.1357 14.8559 33.517 14.9056 33.9148C15.2703 39.186 18.0882 42.0039 23.3594 42.352C23.7407 42.4018 24.1219 42.4349 24.5363 42.4349H37.4657C43.5988 42.4349 46.8312 39.5175 47.1461 33.7159C47.1627 33.401 47.1793 33.0694 47.1793 32.7379V29.5056C47.1793 25.8423 44.7426 22.7591 41.4274 21.748ZM33.1228 31.6605C33.8853 31.9257 34.913 32.4893 34.913 34.2463C34.913 35.7548 33.7361 36.9648 32.2774 36.9648H31.863V37.3295C31.863 37.8102 31.4817 38.1914 31.001 38.1914C30.5203 38.1914 30.1391 37.8102 30.1391 37.3295V36.9648H29.9899C28.3986 36.9648 27.0891 35.6221 27.0891 33.9645C27.0891 33.4838 27.4703 33.1026 27.951 33.1026C28.4317 33.1026 28.813 33.4838 28.813 33.9645C28.813 34.6607 29.3434 35.2409 29.9899 35.2409H30.1391V32.4395L28.8793 31.992C28.1168 31.7268 27.0891 31.1632 27.0891 29.4061C27.0891 27.8977 28.266 26.6876 29.7247 26.6876H30.1391V26.323C30.1391 25.8423 30.5203 25.461 31.001 25.461C31.4817 25.461 31.863 25.8423 31.863 26.323V26.6876H32.0122C33.6035 26.6876 34.913 28.0303 34.913 29.6879C34.913 30.1686 34.5317 30.5499 34.051 30.5499C33.5703 30.5499 33.1891 30.1686 33.1891 29.6879C33.1891 28.9917 32.6586 28.4116 32.0122 28.4116H31.863V31.2129L33.1228 31.6605Z"
            fill="#05A832"
          />
          <path
            d="M28.813 29.4061C28.813 30.1023 29.0119 30.2017 29.4429 30.3675L30.1391 30.6161V28.4115H29.7247C29.2108 28.4115 28.813 28.8591 28.813 29.4061Z"
            fill="#05A832"
          />
        </svg>
      </FeatureCard>
      <FeatureCard
        title="Long Term Growth"
        description="Long-term investments in stocks and cryptocurrencies can lead to impressive growth."
      >
        <svg
          width="62"
          height="61"
          viewBox="0 0 62 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="61" height="61" rx="30.5" fill="#D9FFE3" />
          <path
            opacity="0.4"
            d="M45.625 47.9688H16.375C15.7088 47.9688 15.1562 47.4162 15.1562 46.75C15.1562 46.0838 15.7088 45.5312 16.375 45.5312H45.625C46.2912 45.5312 46.8438 46.0838 46.8438 46.75C46.8438 47.4162 46.2912 47.9688 45.625 47.9688Z"
            fill="#05A832"
          />
          <path
            d="M20.6 24.6175H18C17.1062 24.6175 16.375 25.3487 16.375 26.2425V40.25C16.375 41.1437 17.1062 41.875 18 41.875H20.6C21.4937 41.875 22.225 41.1437 22.225 40.25V26.2425C22.225 25.3325 21.4937 24.6175 20.6 24.6175Z"
            fill="#05A832"
          />
          <path
            d="M32.3002 19.4338H29.7002C28.8064 19.4338 28.0752 20.165 28.0752 21.0588V40.25C28.0752 41.1438 28.8064 41.875 29.7002 41.875H32.3002C33.1939 41.875 33.9252 41.1438 33.9252 40.25V21.0588C33.9252 20.165 33.1939 19.4338 32.3002 19.4338Z"
            fill="#05A832"
          />
          <path
            d="M43.9999 14.25H41.3999C40.5062 14.25 39.7749 14.9812 39.7749 15.875V40.25C39.7749 41.1438 40.5062 41.875 41.3999 41.875H43.9999C44.8936 41.875 45.6249 41.1438 45.6249 40.25V15.875C45.6249 14.9812 44.8936 14.25 43.9999 14.25Z"
            fill="#05A832"
          />
        </svg>
      </FeatureCard>
      <FeatureCard
        title="Inflation Protection"
        description="Investing in stocks and cryptocurrency offers the potential for substantial returns."
      >
        <svg
          width="62"
          height="61"
          viewBox="0 0 62 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="61" height="61" rx="30.5" fill="#D9FFE3" />
          <path
            d="M44.479 28.0699V20.9361C44.479 19.6036 43.4715 18.0924 42.2202 17.5886L33.169 13.8836C31.1377 13.0549 28.8465 13.0549 26.8152 13.8836L17.764 17.5886C16.529 18.0924 15.5215 19.6036 15.5215 20.9361V28.0699C15.5215 36.0162 21.2902 43.4587 29.1715 45.6362C29.7077 45.7824 30.2927 45.7824 30.829 45.6362C38.7102 43.4587 44.479 36.0162 44.479 28.0699ZM31.219 30.9137V35.1874C31.219 35.8537 30.6665 36.4062 30.0002 36.4062C29.334 36.4062 28.7815 35.8537 28.7815 35.1874V30.9137C27.1402 30.3937 25.9377 28.8661 25.9377 27.0624C25.9377 24.8199 27.7577 22.9999 30.0002 22.9999C32.2427 22.9999 34.0627 24.8199 34.0627 27.0624C34.0627 28.8824 32.8602 30.3937 31.219 30.9137Z"
            fill="#05A832"
          />
        </svg>
      </FeatureCard>
    </div>
  );
};
