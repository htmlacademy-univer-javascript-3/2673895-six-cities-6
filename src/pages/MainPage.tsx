import { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { OffersList } from '../components/OffersList';
import { Map } from '../components/Map';
import { CitiesList } from '../components/CitiesList';
import { SortOptions } from '../components/SortOptions';
import { Spinner } from '../components/Spinner';
import { getCity, getOffersByCity, getIsLoading } from '../store/selectors';

export function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const city = useSelector(getCity);
  const offers = useSelector(getOffersByCity);
  const isLoading = useSelector(getIsLoading);

  const handleOfferHover = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);

  const placesCountText = useMemo(() => `${offers.length} places to stay in ${city.name}`, [offers.length, city.name]);

  if (isLoading) {
  return (
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <Spinner />
          </div>
        </div>
      </main>
    );
  }

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
            <b className="places__found">{placesCountText}</b>
            <SortOptions />
            <OffersList offers={offers} onOfferHover={handleOfferHover} />
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
