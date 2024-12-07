import { extractPrice } from './extract-price';

describe('extractPrice', () => {
  it('should return 0 if the input is undefined', () => {
    expect(extractPrice(undefined!)).toBe(0);
  });

  it('should return the numeric part of a valid price string with no decimals', () => {
    expect(extractPrice('100$')).toBe(100);
    expect(extractPrice('Price is 100 dollars')).toBe(100);
  });

  it('should return the numeric part of a vaid price string with decimals', () => {
    expect(extractPrice('100.50$')).toBe(100.5);
    expect(extractPrice('$99.99')).toBe(99.99);
    expect(extractPrice('Price is 100.50 dollars')).toBe(100.5);
  });

  it('should return 0 for strings without any numeric values', () => {
    expect(extractPrice('hello world')).toBe(0);
  });

  it('should return 0 for empty strings', () => {
    expect(extractPrice(' ')).toBe(0);
  });
});
