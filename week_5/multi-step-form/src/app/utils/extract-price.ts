//Function to extract the numeric part from the price string
export function extractPrice(priceString: string | undefined | null): number {
  if (
    typeof priceString === 'undefined' ||
    priceString === undefined ||
    priceString?.trim() === ''
  )
    return 0;

  const match = priceString?.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}
