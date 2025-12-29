import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { SortType } from './reducer';
import { Offer } from '../types/offer';

// Basic selectors
export const getCity = (state: RootState) => state.city.city;
export const getAllOffers = (state: RootState) => state.offers.offers;
export const getSortType = (state: RootState) => state.sort.sortType;
export const getIsLoading = (state: RootState) => state.offers.isLoading;
export const getAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const getUser = (state: RootState) => state.user.user;
export const getCurrentOffer = (state: RootState) => state.offer.currentOffer;
export const getNearPlaces = (state: RootState) => state.offer.nearPlaces;
export const getReviews = (state: RootState) => state.reviews.reviews;
export const getIsOfferLoading = (state: RootState) => state.offer.isOfferLoading;
export const getIsReviewsLoading = (state: RootState) => state.reviews.isReviewsLoading;

// Memoized selector for favorite count
export const getFavoriteCount = createSelector(
  [getAllOffers],
  (offers) => offers.filter((offer) => offer.isFavorite).length
);

// Memoized selector for offers by city and sorted
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
      return sortedOffers; // Original order
  }
};

export const getOffersByCity = createSelector(
  [getCity, getAllOffers, getSortType],
  (city, offers, sortType) => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
    return sortOffers(filteredOffers, sortType);
  }
);

