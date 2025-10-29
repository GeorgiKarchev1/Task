import { useEffect } from 'react';
import { CloseIcon, Star } from './Icons';
import './Modal.scss';

export const Modal = ({ trip, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!trip) return null;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star key={index} filled={index < rating} />
    ));
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          <CloseIcon />
        </button>
        <div className="modal__content">
          <img
            src={trip.image}
            alt={trip.name}
            className="modal__image"
            onError={handleImageError}
          />
          <div className="modal__info">
            <h2 id="modal-title" className="modal__title">{trip.name}</h2>
            <div className="modal__rating" aria-label={`Rating: ${trip.rating} out of 5 stars`}>
              {renderStars(trip.rating)}
            </div>
            <p className="modal__description">{trip.long_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
