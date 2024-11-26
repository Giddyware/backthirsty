import { ERROR_MESSAGES } from '@/components/calculator/constants';
import { fetchStockData } from '@/lib/api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // No need to parse, Next.js automatically parses JSON body
    const { ticker, amountInvested, startDate, endDate } = req.body;

    if (!ticker || !amountInvested || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { startPrice, endPrice, symbol } = await fetchStockData(
      ticker,
      new Date(startDate),
      new Date(endDate)
    );

    const numberOfShares = amountInvested / startPrice;
    const finalAmount = numberOfShares * endPrice;
    const profit = finalAmount - amountInvested;
    const percentageChange = ((finalAmount - amountInvested) / amountInvested) * 100;

    const response = {
      amount: Number(finalAmount.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      percentageChange: Number(percentageChange.toFixed(2)),
      details: {
        symbol,
        startPrice: Number(startPrice.toFixed(2)),
        endPrice: Number(endPrice.toFixed(2)),
        shares: Number(numberOfShares.toFixed(4))
      }
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Calculate API Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : ERROR_MESSAGES.CALCULATION_FAILED
    });
  }
}
