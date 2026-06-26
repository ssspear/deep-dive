import React, { useState, useRef, useEffect, useCallback } from 'react';
import './CreatureCard.css';

function CreatureCard({ creature }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const triggerRef = useRef(null);

  const openLightbox = () => setLightboxOpen(true);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) {
      triggerRef.current?.focus();
    }
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox]);

  const hasImage = Boolean(creature.imageUrl);

  return (
    <div className="creature-card">
      <h2>{creature.name}</h2>

      {hasImage ? (
        <img
          ref={triggerRef}
          className="creature-card__image"
          src={creature.imageUrl}
          alt={creature.name}
          onClick={openLightbox}
          tabIndex={0}
          role="button"
          aria-label={`View full image of ${creature.name}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox();
            }
          }}
        />
      ) : (
        <div className="creature-card__placeholder">No image available</div>
      )}

      <p className="creature-card__field">
        <span className="creature-card__label">Habitat:</span> {creature.habitat}
      </p>
      <p className="creature-card__field">
        <span className="creature-card__label">Diet:</span> {creature.diet}
      </p>
      <p className="creature-card__field">
        <span className="creature-card__label">Conservation Status:</span>{' '}
        {creature.conservationStatus}
      </p>
      <p className="creature-card__field">
        <span className="creature-card__label">Fun Fact:</span> {creature.funFact}
      </p>

      {lightboxOpen && (
        <div
          className="creature-lightbox-backdrop"
          onClick={closeLightbox}
          data-testid="lightbox-backdrop"
        >
          <div
            className="creature-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${creature.name} enlarged`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="creature-lightbox__img"
              src={creature.imageUrl}
              alt={`${creature.name} enlarged`}
            />
            <button
              className="creature-lightbox__close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatureCard;
