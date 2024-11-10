import { Button } from "@/components/ui/button";
import { BitcoinIcon } from "./bitcoin-icon";
import { BNBIcon } from "./bnb-icon";
import { EthereumIcon } from "./ethereum-icon";
import { SolIcon } from "./sol-icon";

export const CryptoPills = () => {
  return (
    <div className="flex gap-2">
      <Button
        variant="pill"
        className="rounded-full p-2 text-black text-sm font-semibold"
      >
        <BitcoinIcon />
        <span className="ml-[10px]">BTC</span>
      </Button>
      <Button
        variant="pill"
        className="rounded-full p-2 text-black text-sm font-semibold"
      >
        <EthereumIcon />
        <span className="ml-[10px]">ETH</span>
      </Button>
      <Button
        variant="pill"
        className="rounded-full p-2 text-black text-sm font-semibold"
      >
        <BNBIcon />
        <span className="ml-[10px]">BNB</span>
      </Button>
      <Button
        variant="pill"
        className="rounded-full p-2 text-black text-sm font-semibold"
      >
        <SolIcon />
        <span className="ml-[10px]">SOL</span>
      </Button>
    </div>
  );
};
