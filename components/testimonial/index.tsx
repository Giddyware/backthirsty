"use client";

import { A11y, Autoplay, Navigation, Scrollbar } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I was always curious about the potential returns on my crypto investments. Back Thirsty provided clear and accurate backtesting results, helping me make informed decisions about my portfolio.",
    name: "Kevin De Bruyne",
    title: "MD Total Industries",
  },
  {
    quote:
      "Using Back Thirsty has been a game-changer for me. The ability to backtest my investment strategies with real data has significantly improved my financial planning and decision-making",
    name: "Leroy Sane",
    title: "Bubble Developer",
  },
  {
    quote:
      "I have been using Back Thirsty for a few months now and I am very impressed with the results. The platform is easy to use and the backtesting results are accurate and reliable.",
    name: "Raheem Sterling",
    title: "CEO, Sterling Group",
  },
  {
    quote:
      "The platform's intuitive interface made it easy to analyze historical performance. It's been invaluable for optimizing my investment strategy across both stocks and crypto.",
    name: "Sarah Chen",
    title: "Investment Director, Nova Capital",
  },
  {
    quote:
      "Back Thirsty transformed how I approach market analysis. Their backtesting tools helped me understand market patterns and make data-driven investment choices.",
    name: "Marcus Thompson",
    title: "Senior Portfolio Manager, Apex Funds",
  },
  {
    quote:
      "As someone new to investing, Back Thirsty's platform gave me the confidence to make my first investments. The historical data insights were eye-opening.",
    name: "Emily Rodriguez",
    title: "Tech Entrepreneur",
  },
];

export const Testimonial = () => {
  return (
    <section className="bg-[#0D1B1A] py-16">
      <h3 className="text-center font-bold text-5xl text-white mx-auto mb-12">
        What Investors have been saying
      </h3>
      <div className="px-20 py-8">
        <Swiper
          modules={[Scrollbar, Autoplay, A11y, Navigation]}
          slidesPerView={2.5}
          spaceBetween={30}
          loop={true}
          navigation
          autoplay={true}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="absolute left-8 top-0">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="54"
                    height="39"
                    transform="translate(5 1)"
                    fill="#0D1B1A"
                  />
                  <path
                    d="M0 8C0 5.87827 0.842857 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0L56 0C58.1217 0 60.1566 0.842855 61.6569 2.34315C63.1571 3.84344 64 5.87827 64 8V40C64 42.1217 63.1571 44.1566 61.6569 45.6569C60.1566 47.1571 58.1217 48 56 48H17.656C16.5952 48.0002 15.578 48.4218 14.828 49.172L3.416 60.584C3.13652 60.8642 2.7802 61.0552 2.39214 61.1328C2.00408 61.2104 1.60173 61.1711 1.236 61.0199C0.870266 60.8687 0.55761 60.6124 0.337589 60.2835C0.117569 59.9546 8.39233e-05 59.5677 0 59.172V8ZM35.224 19.064C34.876 19.56 34.572 20.104 34.316 20.668C32.604 24.46 32.744 30.176 38.084 35.492C38.4099 35.8097 38.845 35.9908 39.3001 35.9982C39.7551 36.0056 40.1959 35.8389 40.532 35.532C40.6959 35.3836 40.8277 35.2031 40.9192 35.0018C41.0107 34.8005 41.0601 34.5826 41.0642 34.3615C41.0683 34.1404 41.0271 33.9208 40.9432 33.7162C40.8592 33.5117 40.7342 33.3265 40.576 33.172C38.9 31.508 37.888 29.848 37.34 28.292C38.416 28.952 39.692 29.332 41.06 29.332C44.9 29.332 48 26.348 48 22.668C48 18.988 44.896 16 41.064 16C39.98 16 38.952 16.24 38.04 16.664L38.008 16.68C37.332 16.96 36.7 17.408 36.132 17.976C35.792 18.308 35.488 18.672 35.224 19.064ZM20 28.292C21.076 28.952 22.352 29.332 23.72 29.332C27.552 29.332 30.66 26.348 30.66 22.668C30.66 18.988 27.552 16 23.724 16C22.64 16 21.612 16.24 20.7 16.664L20.668 16.68C19.988 16.96 19.36 17.408 18.792 17.976C18.452 18.308 18.148 18.672 17.884 19.064C17.536 19.56 17.228 20.104 16.972 20.668C15.26 24.46 15.404 30.176 20.74 35.492C21.0661 35.8108 21.502 35.9927 21.958 36.0001C22.4141 36.0075 22.8556 35.84 23.192 35.532C23.3559 35.3836 23.4877 35.2031 23.5792 35.0018C23.6707 34.8005 23.7201 34.5826 23.7242 34.3615C23.7283 34.1404 23.6871 33.9208 23.6032 33.7162C23.5192 33.5117 23.3942 33.3265 23.236 33.172C21.556 31.508 20.548 29.848 19.996 28.292H20Z"
                    fill="#40EE70"
                  />
                </svg>
              </div>
              <div className="px-8 py-11 flex flex-col bg-white rounded-lg shadow-lg h-60">
                <p className="text-gray-600">{testimonial.quote}</p>

                <div className="flex gap-4">
                  <Image
                    src="/testimonial/1.png"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full mt-6"
                  />
                  <div className="mt-auto">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
