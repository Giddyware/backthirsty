import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqsAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          What types of investments can I calculate?
        </AccordionTrigger>
        <AccordionContent>
          You can calculate potential returns for both stocks and
          cryptocurrencies, selecting from a wide range of options. Our
          extensive database includes various popular stocks and
          cryptocurrencies to provide you with accurate and comprehensive
          results.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          How does the investment calculator work?
        </AccordionTrigger>
        <AccordionContent>
          Our investment calculator uses historical market data to simulate past
          investment performance. Simply input your investment amount, select a
          ticker symbol, choose your start and end dates, and the calculator
          will show you potential returns based on actual historical price
          movements. This helps you understand how different investment timing
          strategies could have performed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Is the calculated return guaranteed?
        </AccordionTrigger>
        <AccordionContent>
          No. The calculated returns are based on historical data and past
          performance is not indicative of future results. Markets can be
          volatile and unpredictable, and investments always carry risk. While
          our calculator provides insights based on real historical data, actual
          returns may vary significantly. Always conduct thorough research and
          consider consulting with a financial advisor before making investment
          decisions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          How accurate is the data used in the calculator?
        </AccordionTrigger>
        <AccordionContent>
          Our calculator uses highly reliable market data sourced from leading
          financial data providers. For stocks, we pull historical prices from
          major exchanges, while cryptocurrency data comes from reputable
          digital asset platforms. The data is regularly updated and verified
          for accuracy. However, please note that in rapidly moving markets,
          there might be slight delays in data updates, and some historical data
          for newer cryptocurrencies might be limited. We continuously monitor
          and maintain our data sources to ensure the highest possible accuracy
          for your calculations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          What types of investments can I calculate?
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>
              Our calculator supports a comprehensive range of investment
              options:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Stocks from major exchanges including NYSE, NASDAQ, and global
                markets
              </li>
              <li>
                Cryptocurrencies including Bitcoin, Ethereum, and other major
                altcoins
              </li>
              <li>ETFs and index funds</li>
              <li>Popular tech stocks and blue-chip companies</li>
            </ul>
            <p>
              We regularly update our database to include new and emerging
              investment options while maintaining historical data for long-term
              analysis and comparison.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
