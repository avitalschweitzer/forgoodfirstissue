import React from 'react';
import { render, act } from '@testing-library/react';
import { AppDataProvider } from '../context/AppDataContext';
import { useAppData } from '../hooks/useAppData';
import { RepositorySortOrder } from '../types';

// Mock the generated.json file
jest.mock('../generated.json', () => ({
  repositories: [
    {
      id: '1',
      name: 'test-repo-1',
      owner: 'owner1',
      description: 'Test repository 1',
      stars: 100,
      stars_display: '100',
      url: 'https://github.com/owner1/test-repo-1',
      language: { id: 'javascript', display: 'JavaScript' },
      last_modified: '2023-01-01',
      has_new_issues: true,
      issues: []
    },
    {
      id: '2',
      name: 'test-repo-2',
      owner: 'owner2',
      description: 'Test repository 2',
      stars: 50,
      stars_display: '50',
      url: 'https://github.com/owner2/test-repo-2',
      language: { id: 'typescript', display: 'TypeScript' },
      last_modified: '2023-01-02',
      has_new_issues: false,
      issues: []
    }
  ],
  languages: [
    { id: 'javascript', display: 'JavaScript', count: 1 },
    { id: 'typescript', display: 'TypeScript', count: 1 }
  ],
  topics: [
    { id: 'sdg-1', display: 'SDG-1 - No Poverty', count: 1 }
  ]
}));

// Test component that uses the context
const TestComponent = () => {
  const { repositories, repositorySortOrder, updateRepositorySortOrder } = useAppData();

  return (
    <div>
      <div data-testid="sort-order">{repositorySortOrder}</div>
      <div data-testid="repo-count">{repositories.length}</div>
      <div data-testid="first-repo-name">{repositories[0]?.name}</div>
      <div data-testid="first-repo-stars">{repositories[0]?.stars}</div>
      <button 
        data-testid="sort-most-stars" 
        onClick={() => updateRepositorySortOrder(RepositorySortOrder.MOST_STARS)}
      >
        Sort by Most Stars
      </button>
      <button 
        data-testid="sort-least-stars" 
        onClick={() => updateRepositorySortOrder(RepositorySortOrder.LEAST_STARS)}
      >
        Sort by Least Stars
      </button>
      <button 
        data-testid="sort-none" 
        onClick={() => updateRepositorySortOrder(RepositorySortOrder.NONE)}
      >
        No Sort
      </button>
    </div>
  );
};

describe('AppDataContext', () => {
  it('should provide initial data from generated.json', () => {
    const { getByTestId } = render(
      <AppDataProvider>
        <TestComponent />
      </AppDataProvider>
    );

    expect(getByTestId('sort-order')).toHaveTextContent('None');
    expect(getByTestId('repo-count')).toHaveTextContent('2');
    expect(getByTestId('first-repo-name')).toHaveTextContent('test-repo-1');
    expect(getByTestId('first-repo-stars')).toHaveTextContent('100');
  });

  it('should sort repositories by most stars', () => {
    const { getByTestId } = render(
      <AppDataProvider>
        <TestComponent />
      </AppDataProvider>
    );

    act(() => {
      getByTestId('sort-most-stars').click();
    });

    expect(getByTestId('sort-order')).toHaveTextContent('By Most Stars');
    expect(getByTestId('first-repo-name')).toHaveTextContent('test-repo-1'); // 100 stars
    expect(getByTestId('first-repo-stars')).toHaveTextContent('100');
  });

  it('should sort repositories by least stars', () => {
    const { getByTestId } = render(
      <AppDataProvider>
        <TestComponent />
      </AppDataProvider>
    );

    act(() => {
      getByTestId('sort-least-stars').click();
    });

    expect(getByTestId('sort-order')).toHaveTextContent('By Least Stars');
    expect(getByTestId('first-repo-name')).toHaveTextContent('test-repo-2'); // 50 stars
    expect(getByTestId('first-repo-stars')).toHaveTextContent('50');
  });

  it('should reset to original order when sort is set to none', () => {
    const { getByTestId } = render(
      <AppDataProvider>
        <TestComponent />
      </AppDataProvider>
    );

    // First sort by most stars
    act(() => {
      getByTestId('sort-most-stars').click();
    });

    // Then reset to none
    act(() => {
      getByTestId('sort-none').click();
    });

    expect(getByTestId('sort-order')).toHaveTextContent('None');
    expect(getByTestId('first-repo-name')).toHaveTextContent('test-repo-1'); // Original order
  });

  it('should toggle sort order when clicking same sort option', () => {
    const { getByTestId } = render(
      <AppDataProvider>
        <TestComponent />
      </AppDataProvider>
    );

    // First click - should sort by most stars
    act(() => {
      getByTestId('sort-most-stars').click();
    });
    expect(getByTestId('sort-order')).toHaveTextContent('By Most Stars');

    // Second click - should reset to none
    act(() => {
      getByTestId('sort-most-stars').click();
    });
    expect(getByTestId('sort-order')).toHaveTextContent('None');
  });
});