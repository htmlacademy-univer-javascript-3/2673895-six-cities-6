import { City } from './reducer';
import { Offer } from '../mocks/offers';

export const changeCity = (city: City) => ({
  type: 'city/changeCity' as const,
  payload: city
});

export const loadOffers = (offers: Offer[]) => ({
  type: 'offers/loadOffers' as const,
  payload: offers
});

