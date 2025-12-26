import { useState } from 'react';
import { useSelector } from 'react-redux';
import { OffersList } from '../components/OffersList';
import { Map } from '../components/Map';
import { CitiesList } from '../components/CitiesList';
import { getCity, getOffersByCity } from '../store/selectors';

export function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const city = useSelector(getCity);
  const offers = useSelector(getOffersByCity);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {city.name}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <OffersList offers={offers} onOfferHover={setActiveOfferId} />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map offers={offers} city={city} activeOfferId={activeOfferId} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
