import { generateCrest } from '../src/app/family-crest/generate-crest';

jest.mock('openai', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    images: {
      generate: jest.fn().mockResolvedValue({
        data: [{ url: 'https://example.com/image.jpg' }],
      }),
    },
  })),
}));

describe('generateCrest', () => {
  it('returns URL of generated image with all properties defined', async () => {
    const imageUrl = await generateCrest({
      symbol: 'symbol',
      name: 'name',
      color: 'color',
      motto: 'motto',
      animal: 'animal',
      details: 'details',
    });
    expect(imageUrl).toBe('https://example.com/image.jpg');
  });
  it('returns URL of generated image with some properties defined', async () => {
    const imageUrl = await generateCrest({
      symbol: 'symbol',
      name: 'name',
      color: 'color',
      motto: 'motto',
    });
    expect(imageUrl).toBe('https://example.com/image.jpg');
  });

  it('returns URL of generated image with no properties defined', async () => {
    const imageUrl = await generateCrest({
      symbol: 'symbol',
      name: 'name',
      color: 'color',
    });
    expect(imageUrl).toBe('https://example.com/image.jpg');
  });
});
