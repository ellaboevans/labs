import { extractPrice } from './extract-price';

describe('extractPrice', () => {
  let result: number;

  it('should return 0 if the input is undefined', () => {
    result = extractPrice(undefined!);
    expect(result).toBe(0);
  });

  it('should return 0 if the input is null', () => {
    result = extractPrice(null);
    expect(result).toBe(0);
  });

  it('should return the numeric part of a valid price string with no decimals', () => {
    result = extractPrice('100$');
    expect(result).toBe(100);
    result = extractPrice('Price is 100 dollars');
    expect(result).toBe(100);
  });

  it('should return the numeric part of a valid price string with decimals', () => {
    result = extractPrice('100.50$');
    expect(result).toBe(100.5);
    result = extractPrice('$99.99');
    expect(result).toBe(99.99);
    result = extractPrice('Price is 100.50 dollars');
    expect(result).toBe(100.5);
  });

  it('should return 0 for strings without any numeric values', () => {
    result = extractPrice('hello world');
    expect(result).toBe(0);
  });

  it('should return 0 for empty strings', () => {
    result = extractPrice(' ');
    expect(result).toBe(0);
  });
});
