import { RootState } from './index';
import { Offer } from '../mocks/offers';

export const getCity = (state: RootState) => state.data.city;
export const getAllOffers = (state: RootState) => state.data.offers;

export const getOffersByCity = (state: RootState): Offer[] => {
  const city = getCity(state);
  const offers = getAllOffers(state);
  return offers.filter((offer) => offer.city.name === city.name);
};

