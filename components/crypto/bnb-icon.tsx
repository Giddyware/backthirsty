import Image from "next/image";

export const BNBIcon = () => (
  <div className="w-[29px] h-[29px] rounded-full">
    <Image
      src="/bnb.png"
      width={29}
      height={29}
      alt="logo of bnb coin"
      className="rounded-full"
    />
  </div>
);
