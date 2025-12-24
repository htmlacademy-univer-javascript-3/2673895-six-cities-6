import { Link } from 'react-router-dom';
import { BookmarkButton } from './BookmarkButton.tsx';
import { Offer } from '../mocks/offers';
import { AppRoutes } from '../App/AppRoutes';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter?: (offerId: string) => void;
  onMouseLeave?: () => void;
  cardClassName?: string;
  imageWrapperClassName?: string;
}

export function OfferCard({ offer, onMouseEnter, onMouseLeave, cardClassName = 'cities__card place-card', imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper' }: OfferCardProps): JSX.Element {
  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter(offer.id);
    }
  };

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
        <Link to={`${AppRoutes.Offer.replace(':id', offer.id)}`}>
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
            <span style={{ width: `${offer.rating * 100 / 5}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer.replace(':id', offer.id)}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>);
}
