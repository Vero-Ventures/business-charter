import { cn, moneyFormatter } from '../src/lib/utils';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

describe('cn function', () => {
  it('should handle empty input', () => {
    const result = cn();
    expect(result).toEqual('');
  });
  it('should merge class names using twMerge and clsx', () => {
    const classNames = ['class1', 'class2', 'class3'];
    const result = cn(...classNames);
    const expected = twMerge(clsx(...classNames));
    expect(result).toEqual(expected);
  });
});

describe('moneyFormatter function', () => {
  it('should format money correctly', () => {
    const expected = '$1,000.00';
    const result = moneyFormatter.format(1000);
    expect(result).toEqual(expected);
  });
});
