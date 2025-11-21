import { renderHook } from '@testing-library/react';
import { useAppData } from '../hooks/useAppData';
import { AppDataProvider } from '../context/AppDataContext';
import { ReactNode } from 'react';

// Mock the generated.json file since it might not exist in test environment
jest.mock('../generated.json', () => ({
  repositories: [],
  languages: [],
  topics: []
}));

describe('useAppData Hook', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AppDataProvider>{children}</AppDataProvider>
  );

  it('should return app data context when used within AppDataProvider', () => {
    const { result } = renderHook(() => useAppData(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.languages).toBeDefined();
    expect(result.current.repositories).toBeDefined();
    expect(result.current.topics).toBeDefined();
    expect(result.current.repositorySortOrder).toBeDefined();
    expect(typeof result.current.updateRepositorySortOrder).toBe('function');
  });

  it('should return default values when used outside AppDataProvider', () => {
    const { result } = renderHook(() => useAppData());

    // Since the context has a default value, it should return the defaults
    expect(result.current.languages).toEqual([]);
    expect(result.current.repositories).toEqual([]);
    expect(result.current.topics).toEqual([]);
    expect(result.current.repositorySortOrder).toBeDefined();
    expect(typeof result.current.updateRepositorySortOrder).toBe('function');
  });

  it('should have correct initial values', () => {
    const { result } = renderHook(() => useAppData(), { wrapper });

    expect(Array.isArray(result.current.languages)).toBe(true);
    expect(Array.isArray(result.current.repositories)).toBe(true);
    expect(Array.isArray(result.current.topics)).toBe(true);
    expect(result.current.repositorySortOrder).toBeDefined();
  });
});