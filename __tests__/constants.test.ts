import { REPOSITORY_SORT_OPTIONS } from '../constants';
import { RepositorySortOrder } from '../types';

describe('Constants', () => {
  describe('REPOSITORY_SORT_OPTIONS', () => {
    it('should contain all repository sort order options', () => {
      expect(REPOSITORY_SORT_OPTIONS).toHaveLength(3);
      expect(REPOSITORY_SORT_OPTIONS).toContain(RepositorySortOrder.LEAST_STARS);
      expect(REPOSITORY_SORT_OPTIONS).toContain(RepositorySortOrder.MOST_STARS);
      expect(REPOSITORY_SORT_OPTIONS).toContain(RepositorySortOrder.NONE);
    });

    it('should have correct enum values', () => {
      expect(RepositorySortOrder.LEAST_STARS).toBe('By Least Stars');
      expect(RepositorySortOrder.MOST_STARS).toBe('By Most Stars');
      expect(RepositorySortOrder.NONE).toBe('None');
    });

    it('should be an array', () => {
      expect(Array.isArray(REPOSITORY_SORT_OPTIONS)).toBe(true);
    });
  });
});