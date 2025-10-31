import { useState, useMemo } from 'react';
import { useFetchTrips } from './hooks/useFetchTrips';
import { TripCard } from './components/TripCard';
import { Modal } from './components/Modal';
import { SearchBar } from './components/SearchBar';
import './App.scss';

function App() {
  const { trips, loading, error } = useFetchTrips();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState(null); // null, 'desc', or 'asc'
  const [selectedTrip, setSelectedTrip] = useState(null);

  const filteredAndSortedTrips = useMemo(() => {
    let result = trips.filter((trip) =>
      trip.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortDirection === 'desc') {
      // Sort by rating: highest to lowest (5 -> 4 -> 3)
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortDirection === 'asc') {
      // Sort by rating: lowest to highest (3 -> 4 -> 5)
      result = [...result].sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [trips, searchQuery, sortDirection]);

  const handleSortToggle = () => {
    if (sortDirection === null) {
      setSortDirection('desc'); // First click: sort highest to lowest
    } else if (sortDirection === 'desc') {
      setSortDirection('asc'); // Second click: sort lowest to highest
    } else {
      setSortDirection(null); // Third click: back to original order
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading__spinner"></div>
          <p>Discovering amazing trips...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">Trip Card Explorer</h1>
        <p className="header__subtitle">Discover your next adventure</p>
      </header>

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortDirection={sortDirection}
        onSortToggle={handleSortToggle}
      />

      {filteredAndSortedTrips.length === 0 ? (
        <div className="no-results">
          <p>No trips found matching "{searchQuery}"</p>
        </div>
      ) : (
        <main className="trip-grid">
          {filteredAndSortedTrips.map((trip, index) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onOpenModal={setSelectedTrip}
              index={index}
            />
          ))}
        </main>
      )}

      {selectedTrip && (
        <Modal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}
    </div>
  );
}

export default App;
