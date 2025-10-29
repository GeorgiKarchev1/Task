import { useState, useMemo } from 'react';
import { useFetchTrips } from './hooks/useFetchTrips';
import { TripCard } from './components/TripCard';
import { Modal } from './components/Modal';
import { SearchBar } from './components/SearchBar';
import './App.scss';

function App() {
  const { trips, loading, error } = useFetchTrips();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const filteredAndSortedTrips = useMemo(() => {
    let result = trips.filter((trip) =>
      trip.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortByRating) {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [trips, searchQuery, sortByRating]);

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
        sortByRating={sortByRating}
        onSortToggle={() => setSortByRating(!sortByRating)}
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
