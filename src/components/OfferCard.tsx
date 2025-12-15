import { BookmarkButton } from './BookmarkButton.tsx';

type OfferCardProps = {
  isPremium: boolean;
  imageSrc: string;
  price: number;
  rating: number;
  placeName: string;
  placeType: string;
}

export function OfferCard({isPremium, imageSrc, price, rating, placeName, placeType}: OfferCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={imageSrc}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton isFavourite={false} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 100 / 5}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">
            {placeName}
          </a>
        </h2>
        <p className="place-card__type">{placeType}</p>
      </div>
    </article>);
}
