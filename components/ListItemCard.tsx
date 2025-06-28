import React from 'react';

interface ListItemCardProps {
  title: string;
  description: string;
  onViewClick?: () => void;
  githubStats?: { commitsCount: number; contributorsCount: number };
  showGithubStats?: boolean;
  timeframe?: string;
}

const ListItemCard: React.FC<ListItemCardProps> = ({
  title,
  description,
  onViewClick,
  githubStats,
  showGithubStats = false,
  timeframe,
}) => (
  <div className="w-full py-4 max-md:py-3 px-3 border-b border-gray-200 flex flex-col rounded-lg mb-2">
    <div className="flex-1 min-w-0">
      <h3 className="default-text font-semibold mb-1">{title}</h3>
      <p className="default-text text-gray-600 mb-2 max-w-3xl">{description}</p>
      <div className="flex flex-wrap items-center justify-between gap-x-4 max-md:gap-x-3 gap-y-2 mt-3">
        {showGithubStats && githubStats && (
          <div className="flex items-center gap-x-4 max-md:gap-x-3 default-label text-gray-500">
            <span className="flex items-center gap-x-1.5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              {githubStats.commitsCount} commits
            </span>
            <span className="flex items-center gap-x-1.5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 110-8 4 4 0 010 8z"/></svg>
              {githubStats.contributorsCount} contributors
            </span>
          </div>
        )}
        {timeframe && !showGithubStats && (
          <div className="flex items-center gap-x-4 default-label text-gray-500">
            <span className="flex items-center gap-x-1.5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              {timeframe}
            </span>
          </div>
        )}
        {onViewClick && (
          <button
            onClick={onViewClick}
            className="px-4 py-1 rounded border border-gray-300 hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors ml-auto max-md:ml-0"
          >
            View
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ListItemCard;
