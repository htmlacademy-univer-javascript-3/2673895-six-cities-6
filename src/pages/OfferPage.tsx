import { useParams, Navigate, Link } from 'react-router-dom';
import { Offer } from '../mocks/offers';
import { BookmarkButton } from '../components/BookmarkButton';
import { ReviewForm } from '../components/ReviewForm';
import { AppRoutes } from '../App/AppRoutes';

type OfferPageProps = {
  offers: Offer[];
};

export function OfferPage({ offers }: OfferPageProps) {
  const { id } = useParams<{ id: string }>();
  const offer = offers.find((o) => o.id === id);

  if (!offer) {
    return <Navigate to={AppRoutes.Main} replace />;
  }

  // Находим предложения в том же городе, исключая текущее
  const nearPlaces = offers.filter(
    (o) => o.city.name === offer.city.name && o.id !== offer.id
  ).slice(0, 3);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.images.map((image, index) => (
              <div key={index} className="offer__image-wrapper">
                <img className="offer__image" src={image} alt={`Photo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offer.title}</h1>
              <button
                className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                type="button"
              >
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${offer.rating * 100 / 5}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{offer.type}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer.goods.map((good) => (
                  <li key={good} className="offer__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                {offer.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                {offer.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="offer__text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews · <span className="reviews__amount">1</span>
              </h2>
              <ul className="reviews__list">
                <li className="reviews__item">
                  <div className="reviews__user user">
                    <div className="reviews__avatar-wrapper user__avatar-wrapper">
                      <img
                        className="reviews__avatar user__avatar"
                        src="img/avatar-max.jpg"
                        width={54}
                        height={54}
                        alt="Reviews avatar"
                      />
                    </div>
                    <span className="reviews__user-name">Max</span>
                  </div>
                  <div className="reviews__info">
                    <div className="reviews__rating rating">
                      <div className="reviews__stars rating__stars">
                        <span style={{ width: '80%' }} />
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <p className="reviews__text">
                      A quiet cozy and picturesque that hides behind a a river by
                      the unique lightness of Amsterdam. The building is green and
                      from 18th century.
                    </p>
                    <time className="reviews__time" dateTime="2019-04-24">
                      April 2019
                    </time>
                  </div>
                </li>
              </ul>
              <ReviewForm />
            </section>
          </div>
        </div>
        <section className="offer__map map" />
      </section>
      {nearPlaces.length > 0 && (
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearPlaces.map((nearOffer) => (
                <article key={nearOffer.id} className="near-places__card place-card">
                  {nearOffer.isPremium && (
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={`${AppRoutes.Offer.replace(':id', nearOffer.id)}`}>
                      <img
                        className="place-card__image"
                        src={nearOffer.previewImage}
                        width={260}
                        height={200}
                        alt="Place image"
                      />
                    </Link>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">€{nearOffer.price}</b>
                        <span className="place-card__price-text">/&nbsp;night</span>
                      </div>
                      <BookmarkButton isFavourite={nearOffer.isFavorite} />
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: `${nearOffer.rating * 100 / 5}%` }} />
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={`${AppRoutes.Offer.replace(':id', nearOffer.id)}`}>
                        {nearOffer.title}
                      </Link>
                    </h2>
                    <p className="place-card__type">{nearOffer.type}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
