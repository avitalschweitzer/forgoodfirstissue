import { IndexedTopics } from '../topics';

describe('IndexedTopics', () => {
  it('should contain all 17 SDG topics', () => {
    const topicKeys = Object.keys(IndexedTopics);
    expect(topicKeys).toHaveLength(17);
  });

  it('should have correct SDG topic mappings', () => {
    expect(IndexedTopics['sdg-1']).toBe('SDG-1 - No Poverty');
    expect(IndexedTopics['sdg-2']).toBe('SDG-2 - Zero Hunger');
    expect(IndexedTopics['sdg-3']).toBe('SDG-3 - Good Health And Well-Being');
    expect(IndexedTopics['sdg-17']).toBe('SDG-17 - Partnerships for the Goals');
  });

  it('should have all SDG keys from 1 to 17', () => {
    for (let i = 1; i <= 17; i++) {
      const key = `sdg-${i}`;
      expect(IndexedTopics).toHaveProperty(key);
      expect(typeof IndexedTopics[key]).toBe('string');
      expect(IndexedTopics[key]).toContain(`SDG-${i}`);
    }
  });

  it('should not have any undefined or empty values', () => {
    Object.values(IndexedTopics).forEach(value => {
      expect(value).toBeDefined();
      expect(value).not.toBe('');
      expect(typeof value).toBe('string');
    });
  });

  it('should have consistent naming pattern', () => {
    Object.entries(IndexedTopics).forEach(([key, value]) => {
      expect(key).toMatch(/^sdg-\d+$/);
      expect(value).toMatch(/^SDG-\d+ - .+$/);
    });
  });
});