import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null if no value is provided', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform(undefined!)).toEqual(null);
  });

  it('should capitalize the first letter of the provided string', () => {
    const pipe = new CapitalizePipe();
    expect(pipe.transform('hello world')).toBe('Hello world');
  });
});
