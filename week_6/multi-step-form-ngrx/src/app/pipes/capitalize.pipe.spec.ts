import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null if no value is provided', () => {
    expect(pipe.transform(undefined!)).toBe(null);
  });

  it('should return null if null value is provided', () => {
    expect(pipe.transform(null)).toBe(null);
  });

  it('should return null for empty string', () => {
    expect(pipe.transform('')).toBe(null);
  });

  it('should capitalize the first letter of the provided string', () => {
    expect(pipe.transform('hello world')).toBe('Hello world');
  });

  it('should capitalize the first letter and preserve the rest of the string', () => {
    expect(pipe.transform('hELLO wORLD')).toBe('HELLO wORLD');
  });
});
