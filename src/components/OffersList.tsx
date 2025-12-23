import { useState } from 'react';
import { OfferCard } from './OfferCard';
import { Offer } from '../mocks/offers';

type OffersListProps = {
  offers: Offer[];
  className?: string;
};

export function OffersList({ offers, className = 'cities__places-list places__list tabs__content' }: OffersListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
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

