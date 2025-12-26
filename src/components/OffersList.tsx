import { OfferCard } from './OfferCard';
import { Offer } from '../types/offer';

type OffersListProps = {
  offers: Offer[];
  className?: string;
  onOfferHover?: (offerId: string | null) => void;
  cardVariant?: 'cities' | 'near-places';
};

export function OffersList({ offers, className = 'cities__places-list places__list tabs__content', onOfferHover, cardVariant = 'cities' }: OffersListProps) {
  const handleMouseEnter = (offerId: string) => {
    if (onOfferHover) {
      onOfferHover(offerId);
    }
  };

  const handleMouseLeave = () => {
    if (onOfferHover) {
      onOfferHover(null);
    }
  };

  const cardClassName = cardVariant === 'near-places' 
    ? 'near-places__card place-card' 
    : 'cities__card place-card';
  
  const imageWrapperClassName = cardVariant === 'near-places'
    ? 'near-places__image-wrapper place-card__image-wrapper'
    : 'cities__image-wrapper place-card__image-wrapper';

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

