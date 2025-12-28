import { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookmarkButton } from './BookmarkButton.tsx';
import { Offer } from '../types/offer';
import { AppRoutes } from '../App/AppRoutes';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter?: (offerId: string) => void;
  onMouseLeave?: () => void;
  cardClassName?: string;
  imageWrapperClassName?: string;
}

function OfferCardComponent({ offer, onMouseEnter, onMouseLeave, cardClassName = 'cities__card place-card', imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper' }: OfferCardProps): JSX.Element {
  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) {
      onMouseEnter(offer.id);
    }
  }, [onMouseEnter, offer.id]);

  const offerLink = useMemo(() => AppRoutes.Offer.replace(':id', offer.id), [offer.id]);
  
  const ratingWidth = useMemo(() => `${offer.rating * 100 / 5}%`, [offer.rating]);

  return (
    <article
      className={cardClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClassName}>
        <Link to={offerLink}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton isFavourite={offer.isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>);
}

export const OfferCard = memo(OfferCardComponent);
