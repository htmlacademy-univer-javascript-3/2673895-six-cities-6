import { memo, useCallback, useMemo } from 'react';
import { OfferCard } from './OfferCard';
import { Offer } from '../types/offer';

type OffersListProps = {
  offers: Offer[];
  className?: string;
  onOfferHover?: (offerId: string | null) => void;
  cardVariant?: 'cities' | 'near-places';
};

function OffersListComponent({ offers, className = 'cities__places-list places__list tabs__content', onOfferHover, cardVariant = 'cities' }: OffersListProps) {
  const handleMouseEnter = useCallback((offerId: string) => {
    if (onOfferHover) {
      onOfferHover(offerId);
    }
  }, [onOfferHover]);

  const handleMouseLeave = useCallback(() => {
    if (onOfferHover) {
      onOfferHover(null);
    }
  }, [onOfferHover]);

  const cardClassName = useMemo(() => 
    cardVariant === 'near-places' 
      ? 'near-places__card place-card' 
      : 'cities__card place-card',
    [cardVariant]
  );
  
  const imageWrapperClassName = useMemo(() =>
    cardVariant === 'near-places'
      ? 'near-places__image-wrapper place-card__image-wrapper'
      : 'cities__image-wrapper place-card__image-wrapper',
    [cardVariant]
  );

  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          cardClassName={cardClassName}
          imageWrapperClassName={imageWrapperClassName}
        />
      ))}
    </div>
  );
}

export const OffersList = memo(OffersListComponent);

