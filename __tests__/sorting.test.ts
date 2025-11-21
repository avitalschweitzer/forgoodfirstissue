import { Repository, RepositorySortOrder } from '../types';

// Extract the sorting logic for testing
export const sortRepositories = (repositories: Repository[], sortOrder: RepositorySortOrder): Repository[] => {
  if (sortOrder === RepositorySortOrder.MOST_STARS) {
    return [...repositories].sort((currentRepository, nextRepository) => {
      return nextRepository.stars - currentRepository.stars;
    });
  }

  if (sortOrder === RepositorySortOrder.LEAST_STARS) {
    return [...repositories].sort((currentRepository, nextRepository) => {
      return currentRepository.stars - nextRepository.stars;
    });
  }

  if (sortOrder === RepositorySortOrder.NONE) {
    return repositories;
  }

  return repositories;
};

describe('Repository Sorting Logic', () => {
  const mockRepositories: Repository[] = [
    {
      id: '1',
      name: 'repo-one',
      owner: 'owner1',
      description: 'First repository',
      stars: 100,
      stars_display: '100',
      url: 'https://github.com/owner1/repo-one',
      language: { id: 'javascript', display: 'JavaScript' },
      last_modified: '2023-01-01',
      has_new_issues: true,
      issues: []
    },
    {
      id: '2',
      name: 'repo-two',
      owner: 'owner2',
      description: 'Second repository',
      stars: 50,
      stars_display: '50',
      url: 'https://github.com/owner2/repo-two',
      language: { id: 'typescript', display: 'TypeScript' },
      last_modified: '2023-01-02',
      has_new_issues: false,
      issues: []
    },
    {
      id: '3',
      name: 'repo-three',
      owner: 'owner3',
      description: 'Third repository',
      stars: 200,
      stars_display: '200',
      url: 'https://github.com/owner3/repo-three',
      language: { id: 'python', display: 'Python' },
      last_modified: '2023-01-03',
      has_new_issues: true,
      issues: []
    }
  ];

  describe('sortRepositories', () => {
    it('should sort repositories by most stars in descending order', () => {
      const result = sortRepositories(mockRepositories, RepositorySortOrder.MOST_STARS);
      
      expect(result).toHaveLength(3);
      expect(result[0].stars).toBe(200);
      expect(result[1].stars).toBe(100);
      expect(result[2].stars).toBe(50);
      expect(result[0].name).toBe('repo-three');
      expect(result[1].name).toBe('repo-one');
      expect(result[2].name).toBe('repo-two');
    });

    it('should sort repositories by least stars in ascending order', () => {
      const result = sortRepositories(mockRepositories, RepositorySortOrder.LEAST_STARS);
      
      expect(result).toHaveLength(3);
      expect(result[0].stars).toBe(50);
      expect(result[1].stars).toBe(100);
      expect(result[2].stars).toBe(200);
      expect(result[0].name).toBe('repo-two');
      expect(result[1].name).toBe('repo-one');
      expect(result[2].name).toBe('repo-three');
    });

    it('should return original array when sort order is NONE', () => {
      const result = sortRepositories(mockRepositories, RepositorySortOrder.NONE);
      
      expect(result).toEqual(mockRepositories);
      expect(result[0].name).toBe('repo-one');
      expect(result[1].name).toBe('repo-two');
      expect(result[2].name).toBe('repo-three');
    });

    it('should not mutate the original array', () => {
      const originalOrder = mockRepositories.map(repo => repo.name);
      
      sortRepositories(mockRepositories, RepositorySortOrder.MOST_STARS);
      
      const currentOrder = mockRepositories.map(repo => repo.name);
      expect(currentOrder).toEqual(originalOrder);
    });

    it('should handle empty array', () => {
      const result = sortRepositories([], RepositorySortOrder.MOST_STARS);
      expect(result).toEqual([]);
    });

    it('should handle single repository', () => {
      const singleRepo = [mockRepositories[0]];
      const result = sortRepositories(singleRepo, RepositorySortOrder.MOST_STARS);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockRepositories[0]);
    });

    it('should handle repositories with same star count', () => {
      const sameStarsRepos: Repository[] = [
        { ...mockRepositories[0], stars: 100, name: 'repo-a' },
        { ...mockRepositories[1], stars: 100, name: 'repo-b' },
        { ...mockRepositories[2], stars: 100, name: 'repo-c' }
      ];

      const resultMost = sortRepositories(sameStarsRepos, RepositorySortOrder.MOST_STARS);
      const resultLeast = sortRepositories(sameStarsRepos, RepositorySortOrder.LEAST_STARS);
      
      // All should have same star count
      expect(resultMost.every(repo => repo.stars === 100)).toBe(true);
      expect(resultLeast.every(repo => repo.stars === 100)).toBe(true);
    });
  });
});