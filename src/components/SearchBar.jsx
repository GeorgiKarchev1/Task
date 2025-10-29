import { SearchIcon } from './Icons';
import './SearchBar.scss';

export const SearchBar = ({ searchQuery, onSearchChange, sortByRating, onSortToggle }) => {
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
        className={`search-bar__sort-button ${sortByRating ? 'active' : ''}`}
        onClick={onSortToggle}
        aria-pressed={sortByRating}
      >
        Sort by Rating {sortByRating ? '↓' : '↑'}
      </button>
    </div>
  );
};
