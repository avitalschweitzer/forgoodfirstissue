import { render, screen } from '@testing-library/react';
import { RepositoryMetadata } from '../components/RepositoryMetadata';

describe('RepositoryMetadata', () => {
  const defaultProps = {
    isIssueOpen: true,
    repositoryNumIssues: 5,
    lastModified: '2023-12-01',
    repositoryLang: 'TypeScript',
    repositoryTopics: [
      { display: 'react', name: 'react' },
      { display: 'typescript', name: 'typescript' }
    ]
  };

  it('renders all metadata fields correctly', () => {
    render(<RepositoryMetadata {...defaultProps} />);
    
    expect(screen.getByText('Issues:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Language:')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Label:')).toBeInTheDocument();
    expect(screen.getByText('react, typescript')).toBeInTheDocument();
    expect(screen.getByText('Last activity:')).toBeInTheDocument();
    expect(screen.getByText('2023-12-01')).toBeInTheDocument();
  });

  it('displays issue count without "+" when less than 10', () => {
    render(<RepositoryMetadata {...defaultProps} repositoryNumIssues={9} />);
    
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.queryByText('9+')).not.toBeInTheDocument();
  });

  it('displays issue count with "+" when 10 or more', () => {
    render(<RepositoryMetadata {...defaultProps} repositoryNumIssues={10} />);
    
    expect(screen.getByText('10+')).toBeInTheDocument();
  });

  it('displays issue count with "+" when more than 10', () => {
    render(<RepositoryMetadata {...defaultProps} repositoryNumIssues={25} />);
    
    expect(screen.getByText('25+')).toBeInTheDocument();
  });

  it('does not render topics section when topics array is empty', () => {
    render(<RepositoryMetadata {...defaultProps} repositoryTopics={[]} />);
    
    expect(screen.queryByText('Label:')).not.toBeInTheDocument();
  });

  it('does not render topics section when topics is null', () => {
    render(<RepositoryMetadata {...defaultProps} repositoryTopics={null} />);
    
    expect(screen.queryByText('Label:')).not.toBeInTheDocument();
  });

  it('renders single topic correctly', () => {
    const singleTopicProps = {
      ...defaultProps,
      repositoryTopics: [{ display: 'javascript', name: 'javascript' }]
    };
    
    render(<RepositoryMetadata {...singleTopicProps} />);
    
    expect(screen.getByText('Label:')).toBeInTheDocument();
    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('joins multiple topics with commas and spaces', () => {
    const multipleTopicsProps = {
      ...defaultProps,
      repositoryTopics: [
        { display: 'react', name: 'react' },
        { display: 'typescript', name: 'typescript' },
        { display: 'nextjs', name: 'nextjs' }
      ]
    };
    
    render(<RepositoryMetadata {...multipleTopicsProps} />);
    
    expect(screen.getByText('react, typescript, nextjs')).toBeInTheDocument();
  });

  it('handles edge case with 0 issues', () => {
    render(<RepositoryMetadata {...defaultProps} repositoryNumIssues={0} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByText('0+')).not.toBeInTheDocument();
  });

  it('handles edge case with exactly 10 issues', () => {
    render(<RepositoryMetadata {...defaultProps} repositoryNumIssues={10} />);
    
    expect(screen.getByText('10+')).toBeInTheDocument();
  });
});