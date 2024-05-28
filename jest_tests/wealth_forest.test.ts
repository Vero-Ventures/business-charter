import { wealthItems } from '../src/app/wealth-forest/data';
interface WealthItem {
  alt: string;
  src: string;
  description: string;
}
describe('wealthItems array', () => {
  it('should be properly defined', () => {
    expect(Array.isArray(wealthItems)).toBe(true);
  });

  it('should contain the expected number of items', () => {
    expect(wealthItems.length).toBe(7);
  });
  it('should contain the expected items', () => {
    wealthItems.forEach((item: WealthItem) => {
      expect(item).toHaveProperty('alt');
      expect(item).toHaveProperty('src');
      expect(item).toHaveProperty('description');
    });
  });
  it('each item should have a non-empty alt property', () => {
    wealthItems.forEach((item: WealthItem) => {
      expect(item.alt).toBeTruthy();
    });
  });

  it('each item should have a non-empty src property', () => {
    wealthItems.forEach((item: WealthItem) => {
      expect(item.src).toBeTruthy();
    });
  });

  it('each item should have a non-empty description property', () => {
    wealthItems.forEach((item: WealthItem) => {
      expect(item.description).toBeTruthy();
    });
  });
});
