const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY; // Move to server-side only
const BASE_URL = 'https://www.alphavantage.co/query';

interface StockData {
  startPrice: number;
  endPrice: number;
  symbol: string;
}

export async function fetchStockData(symbol: string, startDate: Date, endDate: Date): Promise<StockData> {
  try {
    // Using TIME_SERIES_MONTHLY_ADJUSTED for better rate limits
    const response = await fetch(
      `${BASE_URL}?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Stock Calculator'
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    if (!data['Monthly Adjusted Time Series']) {
      throw new Error('No data available for this symbol');
    }

    const timeSeries = data['Monthly Adjusted Time Series'];
    const startPrice = findClosestPrice(timeSeries, startDate, 'start');
    const endPrice = findClosestPrice(timeSeries, endDate, 'end');

    if (!startPrice || !endPrice) {
      throw new Error('No data available for the selected date range');
    }

    return {
      startPrice,
      endPrice,
      symbol: symbol.toUpperCase(),
    };
  } catch (error) {
    console.error('Stock API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch stock data');
  }
}

function findClosestPrice(
  timeSeries: Record<string, any>, 
  targetDate: Date,
  type: 'start' | 'end'
): number {
  const dates = Object.keys(timeSeries).sort();
  const targetDateStr = targetDate.toISOString().split('T')[0];

  let closestDate: string | undefined;

  if (type === 'start') {
    closestDate = dates.find(date => date >= targetDateStr);
  } else {
    closestDate = dates.reverse().find(date => date <= targetDateStr);
  }

  if (!closestDate || !timeSeries[closestDate]) {
    throw new Error(`No data available for ${targetDateStr}`);
  }

  return parseFloat(timeSeries[closestDate]['5. adjusted close']);
}
