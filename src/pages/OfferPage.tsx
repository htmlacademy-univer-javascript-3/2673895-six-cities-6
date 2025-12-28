import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewsList } from '../components/ReviewsList';
import { Map } from '../components/Map';
import { OffersList } from '../components/OffersList';
import { Spinner } from '../components/Spinner';
import { 
  getCurrentOffer, 
  getNearPlaces, 
  getReviews, 
  getIsOfferLoading,
  getIsReviewsLoading 
} from '../store/selectors';
import { fetchOffer, fetchNearPlaces, fetchReviews } from '../store/actions';
import { AppDispatch } from '../store';

export function OfferPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const offer = useSelector(getCurrentOffer);
  const nearPlaces = useSelector(getNearPlaces);
  const reviews = useSelector(getReviews);
  const isOfferLoading = useSelector(getIsOfferLoading);
  const isReviewsLoading = useSelector(getIsReviewsLoading);

  const loadOfferData = useCallback((offerId: string) => {
    dispatch(fetchOffer(offerId));
    dispatch(fetchNearPlaces(offerId));
    dispatch(fetchReviews(offerId));
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      loadOfferData(id);
    }
  }, [id, loadOfferData]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <Navigate to="*" replace />;
  }

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
              <ReviewsList reviews={reviews} isLoading={isReviewsLoading} />
              <ReviewForm offerId={id || ''} />
            </section>
          </div>
        </div>
        <section className="offer__map map">
          <Map offers={nearPlaces} city={offer.city} />
        </section>
      </section>
      {nearPlaces.length > 0 && (
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <OffersList
              offers={nearPlaces}
              className="near-places__list places__list"
              cardVariant="near-places"
            />
          </section>
        </div>
      )}
      </main>
  );
}
