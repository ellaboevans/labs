//Function to extract the numeric part from the price string
export function extractPrice(priceString: string): number {
  if (typeof priceString === 'undefined') return 0;

  const match = priceString.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}
