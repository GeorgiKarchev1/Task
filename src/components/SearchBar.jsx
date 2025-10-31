import { SearchIcon, Star, ArrowDownIcon, ArrowUpIcon } from './Icons';
import './SearchBar.scss';

export const SearchBar = ({ searchQuery, onSearchChange, sortDirection, onSortToggle }) => {
  const getSortButtonText = () => {
    if (sortDirection === 'desc') {
      return 'High to Low';
    } else if (sortDirection === 'asc') {
      return 'Low to High';
    }
    return 'Sort by Rating';
  };

  const getSortAriaLabel = () => {
    if (sortDirection === 'desc') {
      return 'Currently sorted by rating from highest to lowest. Click to sort from lowest to highest.';
    } else if (sortDirection === 'asc') {
      return 'Currently sorted by rating from lowest to highest. Click to remove sorting.';
    }
    return 'Click to sort by rating from highest to lowest.';
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <SearchIcon />
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search trips..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search trips"
        />
      </div>
      <button
        className={`search-bar__sort-button ${sortDirection ? 'active' : ''}`}
        onClick={onSortToggle}
        aria-pressed={!!sortDirection}
        aria-label={getSortAriaLabel()}
      >
        <span className="search-bar__sort-button-content">
          <span className="search-bar__sort-icon">
            <Star filled={true} />
          </span>
          <span className="search-bar__sort-text">
            {getSortButtonText()}
          </span>
          <span className="search-bar__sort-arrow">
            {sortDirection === 'desc' ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </span>
        </span>
      </button>
    </div>
  );
};
