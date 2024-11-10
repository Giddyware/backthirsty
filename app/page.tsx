"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

const CryptoPills = () => {
  return (
    <div className="flex gap-2">
      <Button
        variant={"pill"}
        className="rounded-full p-2 text-black text-sm font-semibold"
      >
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.8047 17.568C25.9368 25.0788 18.3287 29.632 10.8374 27.764C3.34605 25.896 -1.22657 18.288 0.641393 10.7966C2.50936 3.28586 10.1174 -1.26731 17.6088 0.600659C25.1195 2.44917 29.6727 10.0572 27.8047 17.568Z"
            fill="#F7931A"
          />
          <path
            d="M20.3912 12.178C20.6636 10.31 19.2432 9.31767 17.3169 8.63664L17.9395 6.1071L16.4023 5.71794L15.7991 8.16965C15.3905 8.07236 14.9819 7.97507 14.5733 7.87778L15.1959 5.40662L13.6588 5.01746L13.0361 7.54699C12.7053 7.46916 12.3745 7.39133 12.0632 7.3135L9.94228 6.78813L9.53366 8.4226C9.53366 8.4226 10.6817 8.67556 10.6428 8.69501C11.2654 8.85068 11.3822 9.2593 11.3627 9.59008L10.6428 12.4699C10.6817 12.4893 10.7401 12.4893 10.7984 12.5282C10.7401 12.5088 10.7011 12.5088 10.6428 12.4893L9.63095 16.5171C9.55312 16.7117 9.35854 16.9841 8.93047 16.8868C8.94993 16.9063 7.82136 16.6144 7.82136 16.6144L7.0625 18.3656L9.06667 18.8715C9.43637 18.9688 9.80607 19.0661 10.1563 19.1634L9.51421 21.7124L11.0514 22.1016L11.674 19.572C12.1021 19.6888 12.4913 19.7861 12.8999 19.8834L12.2772 22.3934L13.8144 22.7826L14.4565 20.2336C17.0834 20.72 19.0486 20.5255 19.8853 18.1516C20.5469 16.2447 19.8464 15.1356 18.4649 14.4157C19.4378 14.2016 20.1966 13.5401 20.3912 12.178ZM16.8888 17.1009C16.4218 19.0077 13.1918 17.9765 12.1605 17.7235L12.9972 14.3378C14.0479 14.5908 17.3752 15.1161 16.8888 17.1009ZM17.3558 12.1585C16.9277 13.8903 14.2425 13.0147 13.3863 12.8006L14.1452 9.72629C15.0208 9.94033 17.8228 10.3489 17.3558 12.1585Z"
            fill="white"
          />
        </svg>

        <span className="ml-[10px]">BTC</span>
      </Button>
      <Button className="rounded-full p-2 text-black text-sm font-semibold">
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_282_655)">
            <path
              d="M14.5876 28.1818C22.3196 28.1818 28.5876 21.9137 28.5876 14.1818C28.5876 6.44978 22.3196 0.181763 14.5876 0.181763C6.85566 0.181763 0.587646 6.44978 0.587646 14.1818C0.587646 21.9137 6.85566 28.1818 14.5876 28.1818Z"
              fill="#627EEA"
            />
            <path
              d="M14.5876 3.68176V11.443L21.1475 14.3743L14.5876 3.68176Z"
              fill="white"
              fill-opacity="0.602"
            />
            <path
              d="M15.0234 3.68176L8.46265 14.3743L15.0234 11.443V3.68176Z"
              fill="white"
            />
            <path
              d="M14.5876 19.7398V25.0134L21.1519 15.9318L14.5876 19.7398Z"
              fill="white"
              fill-opacity="0.602"
            />
            <path
              d="M15.0234 25.0134V19.7389L8.46265 15.9318L15.0234 25.0134Z"
              fill="white"
            />
            <path
              d="M14.5876 18.2951L21.1475 14.4863L14.5876 11.5568V18.2951Z"
              fill="white"
              fill-opacity="0.2"
            />
            <path
              d="M8.46265 14.4863L15.0234 18.2951V11.5568L8.46265 14.4863Z"
              fill="white"
              fill-opacity="0.602"
            />
          </g>
          <defs>
            <clipPath id="clip0_282_655">
              <rect
                width="28"
                height="28"
                fill="white"
                transform="translate(0.587646 0.181763)"
              />
            </clipPath>
          </defs>
        </svg>

        <span className="ml-[10px]">ETH</span>
      </Button>
      <Button className="rounded-full p-2 text-black text-sm font-semibold">
        <div className="w-[29px] h-[29px] rounded-full">
          <Image
            src="/bnb.png"
            width={29}
            height={29}
            alt="logo of bnb coin"
            className="rounded-full"
          />
        </div>
        <span className="ml-[10px]">BNB</span>
      </Button>
      <Button className="rounded-full p-2 text-black text-sm font-semibold">
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.847168"
            y="0.181763"
            width="28"
            height="28"
            rx="14"
            fill="#191919"
          />
          <g clip-path="url(#clip0_282_672)">
            <path
              d="M7.99544 18.1726C8.11399 18.0541 8.27472 17.9875 8.44231 17.9875H23.9053C24.187 17.9875 24.3279 18.3282 24.1287 18.5273L21.0732 21.5803C20.9547 21.6988 20.794 21.7653 20.6264 21.7653H5.16343C4.88174 21.7653 4.74073 21.4247 4.93999 21.2256L7.99544 18.1726Z"
              fill="url(#paint0_linear_282_672)"
            />
            <path
              d="M7.99544 6.76678C8.11399 6.64833 8.27472 6.58179 8.44231 6.58179H23.9053C24.187 6.58179 24.3279 6.92241 24.1287 7.12151L21.0732 10.1745C20.9547 10.293 20.794 10.3595 20.6264 10.3595H5.16343C4.88174 10.3595 4.74073 10.0189 4.93999 9.8198L7.99544 6.76678Z"
              fill="url(#paint1_linear_282_672)"
            />
            <path
              d="M21.0732 12.4334C20.9547 12.3149 20.794 12.2484 20.6264 12.2484H5.16343C4.88174 12.2484 4.74073 12.589 4.93999 12.7881L7.99544 15.8411C8.11399 15.9596 8.27472 16.0261 8.44231 16.0261H23.9053C24.187 16.0261 24.3279 15.6855 24.1287 15.4864L21.0732 12.4334Z"
              fill="url(#paint2_linear_282_672)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_282_672"
              x1="17.9455"
              y1="2.41676"
              x2="7.24387"
              y2="22.9148"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#00FFA3" />
              <stop offset="1" stop-color="#DC1FFF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_282_672"
              x1="17.9455"
              y1="2.41684"
              x2="7.24387"
              y2="22.9149"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#00FFA3" />
              <stop offset="1" stop-color="#DC1FFF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_282_672"
              x1="17.9455"
              y1="2.41684"
              x2="7.24387"
              y2="22.9149"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#00FFA3" />
              <stop offset="1" stop-color="#DC1FFF" />
            </linearGradient>
            <clipPath id="clip0_282_672">
              <rect
                width="19.3897"
                height="15.2"
                fill="white"
                transform="translate(4.84692 6.58179)"
              />
            </clipPath>
          </defs>
        </svg>

        <span className="ml-[10px]">SOL</span>
      </Button>
    </div>
  );
};

interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="max-w-sm py-8 px-5 bg-white text-center border border-gray-200 rounded-lg shadow h-64">
      <div className="flex items-center flex-col mb-6">
        <span className="">{children}</span>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="text-[#838383]">{description}</p>
    </div>
  );
};

const CardContainer: React.FC = () => {
  return (
    <div className="flex mx-auto gap-[20px] items-start flex-wrap">
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
const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            {/* <a href="#" className="-m-1.5 p-1.5"> */}
            <Image
              className="h-8 w-auto"
              src="/logo.png"
              alt=""
              width={32}
              height={32}
            />
            <span className="text-white">BackThirsty</span>
            {/* </a> */}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <FaBarsStaggered className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 bg-[#40EE70] px-10 py-3 rounded-sm"
            >
              Subscribe <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate pt-14 bg-[#0D1B1A] overflow-y-hidden">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] size-[20%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(13, 27, 26,1),rgba(255,255,255,0))]" />
        {/* <div className="absolute bottom-0 right-[-20%] top-[-10%] size-[20%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(13, 27, 26,1),rgba(255,255,255,0))]" /> */}
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-[#284137] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={100}
              height={100}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-[#10251e]">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-20 min-h-[780px]">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Back Testing For Normal People
            </h1>
            <p className="mt-6 text-lg leading-8 text-white max-w-[542px]">
              See how much you could have made with past investments in stocks
              and cryptocurrency
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="rounded-md bg-[#40EE70] px-10 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#40EE70/10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#40EE70]"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <Tabs
              defaultValue="stocks"
              className="w-[523px] rounded-[9px] bg-white pt-6 mx-auto"
            >
              <TabsList className="grid max-w-[368px] gap-3 bg-[#F0F0F0] rounded-[10px] p-[2.3px] mx-auto grid-cols-2">
                <TabsTrigger
                  className="inline-flex  items-center justify-center whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#14A83C] data-[state=active]:text-white data-[state=active]:shadow-sm"
                  value="stocks"
                >
                  Stocks
                </TabsTrigger>
                <TabsTrigger
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-medium ring-offset-background transition-all  duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#14A83C] data-[state=active]:text-white data-[state=active]:shadow-sm"
                  value="crypto"
                >
                  Crypto
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stocks">
                <Card className="border-none">
                  <CardHeader>
                    <CardTitle>Stocks</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when
                      you&rsquo;re done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 mx-auto w-full">
                    <div className="flex gap-6 flex-col w-full">
                      <div className="flex w-full gap-6">
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="ticker">Ticker</Label>
                          <Input id="ticker" placeholder="Enter ticker" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="amount_invested">
                            Amount Invested
                          </Label>
                          <Input id="amount_invested" placeholder="$0.00" />
                        </div>
                      </div>
                      <div className="flex w-full gap-6">
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="start_date">Start Date</Label>
                          <Input id="start_date" placeholder="Select Date" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label htmlFor="end_date">End Date</Label>
                          <Input id="end_date" placeholder="Select Date" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col">
                    {/* <div className='flex flex-col w-full'> */}
                    <Button size="full" variant="default">
                      Calculate
                    </Button>
                    <div className="space-y-1 mt-5 w-full">
                      <Label htmlFor="potential_earning">
                        Potential Earning
                      </Label>
                      <Input
                        id="potential_earning"
                        placeholder="$0.00"
                        className="w-full h-1[53px] lg:h-[75px]"
                      />
                    </div>
                    {/* </div> */}
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="crypto">
                <Card className="border-none">
                  <CardHeader>
                    <CardTitle>Crypto</CardTitle>
                    <CardDescription className="mx-auto">
                      <CryptoPills />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex gap-6 flex-col">
                      <div className="flex gap-6">
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="ticker">Ticker</Label>
                          <Input id="ticker" placeholder="Enter ticker" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="amount_invested">
                            Amount Invested
                          </Label>
                          <Input id="amount_invested" placeholder="$0.00" />
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="start_date">Start Date</Label>
                          <Input id="start_date" placeholder="Select Date" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <Label htmlFor="end_date">End Date</Label>
                          <Input id="end_date" placeholder="Select Date" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="full" variant="default">
                      Calculate
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
};
const FeaturesSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:items-center lg:gap-x-10 lg:px-8 lg:py-20">
      <h3 className="text-center font-bold text-5xl max-w-2xl mx-auto mb-12">
        Why You Should Start Investing Now
      </h3>
      <CardContainer />
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
