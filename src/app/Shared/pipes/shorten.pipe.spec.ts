import { ShortenPipe } from './shorten.pipe';

describe('ShortenPipe', () => {
  let pipe: ShortenPipe;

  beforeEach(() => {
    pipe = new ShortenPipe();
  });

  it('should return the first character in uppercase', () => {
    expect(pipe.transform('hello')).toBe('H');
    expect(pipe.transform('angular')).toBe('A');
  });

  it('should handle empty strings gracefully', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle already capitalized input', () => {
    expect(pipe.transform('World')).toBe('W');
  });
});
