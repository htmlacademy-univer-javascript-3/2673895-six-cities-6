import { OfferCard } from './OfferCard';
import { Offer } from '../mocks/offers';

type OffersListProps = {
  offers: Offer[];
  className?: string;
  onOfferHover?: (offerId: string | null) => void;
};

export function OffersList({ offers, className = 'cities__places-list places__list tabs__content', onOfferHover }: OffersListProps) {
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

  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

