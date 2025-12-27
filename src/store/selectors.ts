import { RootState } from './index';
import { SortType } from './reducer';
import { Offer } from '../types/offer';

export const getCity = (state: RootState) => state.data.city;
export const getAllOffers = (state: RootState) => state.data.offers;
export const getSortType = (state: RootState) => state.data.sortType;
export const getIsLoading = (state: RootState) => state.data.isLoading;
export const getAuthorizationStatus = (state: RootState) => state.data.authorizationStatus;
export const getUser = (state: RootState) => state.data.user;
export const getCurrentOffer = (state: RootState) => state.data.currentOffer;
export const getNearPlaces = (state: RootState) => state.data.nearPlaces;
export const getReviews = (state: RootState) => state.data.reviews;
export const getIsOfferLoading = (state: RootState) => state.data.isOfferLoading;
export const getIsReviewsLoading = (state: RootState) => state.data.isReviewsLoading;

const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  const sortedOffers = [...offers];
  
  switch (sortType) {
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    case 'Popular':
    default:
      return sortedOffers; // Исходный порядок
  }
};

export const getOffersByCity = (state: RootState): Offer[] => {
  const city = getCity(state);
  const offers = getAllOffers(state);
  const sortType = getSortType(state);
  const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
  return sortOffers(filteredOffers, sortType);
};

