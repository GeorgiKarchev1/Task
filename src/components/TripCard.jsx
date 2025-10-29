import { Star } from './Icons';
import './TripCard.scss';

export const TripCard = ({ trip, onOpenModal, index = 0 }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star key={index} filled={index < rating} />
    ));
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
  };

  return (
    <article
      className="trip-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="trip-card__image-wrapper">
        <img
          src={trip.image}
          alt={trip.name}
          className="trip-card__image"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <div className="trip-card__content">
        <h2 className="trip-card__title">{trip.name}</h2>
        <div className="trip-card__rating" aria-label={`Rating: ${trip.rating} out of 5 stars`}>
          {renderStars(trip.rating)}
        </div>
        <p className="trip-card__description">{trip.description}</p>
        <button
          className="trip-card__button"
          onClick={() => onOpenModal(trip)}
          aria-label={`View more information about ${trip.name}`}
        >
          More Info
        </button>
      </div>
    </article>
  );
};
