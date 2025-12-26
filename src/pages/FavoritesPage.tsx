import { useSelector } from 'react-redux';
import { FavoriteCard } from '../components/FavoriteCard';
import { Link } from 'react-router-dom';
import { Offer } from '../types/offer';
import { getAllOffers } from '../store/selectors';
import { AppRoutes } from '../App/AppRoutes';

export function Favourites() {
  const offers = useSelector(getAllOffers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  
  // Группируем по городам
  const offersByCity = favoriteOffers.reduce((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, Offer[]>);

  if (favoriteOffers.length === 0) {
  return (
      <>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
            </div>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoutes.Main}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33}/>
          </Link>
        </footer>
      </>
    );
  }

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                <li key={cityName} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                        <span>{cityName}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <FavoriteCard key={offer.id} offer={offer} />
                    ))}
                </div>
              </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoutes.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33}/>
        </Link>
      </footer>
    </>
  );
}
