import { City, SortType } from './reducer';
import { Offer } from '../types/offer';
import { AuthorizationStatus, AuthInfo } from '../types/auth';
import { Review, ReviewPost } from '../types/review';
import { AppDispatch } from './index';
import { AxiosInstance } from 'axios';
import { saveToken, dropToken, getToken } from '../services/api';

export const changeCity = (city: City) => ({
  type: 'city/changeCity' as const,
  payload: city
});

export const loadOffers = (offers: Offer[]) => ({
  type: 'offers/loadOffers' as const,
  payload: offers
});

export const setLoading = (isLoading: boolean) => ({
  type: 'offers/setLoading' as const,
  payload: isLoading
});

export const changeSortType = (sortType: SortType) => ({
  type: 'sort/changeSortType' as const,
  payload: sortType
});

export const requireAuthorization = (status: AuthorizationStatus) => ({
  type: 'user/requireAuthorization' as const,
  payload: status
});

export const setUser = (user: AuthInfo) => ({
  type: 'user/setUser' as const,
  payload: user
});

export const logout = () => {
  dropToken();
  return {
    type: 'user/logout' as const
  };
};

export const fetchOffers = () => async (dispatch: AppDispatch, _getState: unknown, api: AxiosInstance) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(loadOffers(data));
  } catch (error) {
    dispatch(setLoading(false));
    throw error;
  }
};

export const checkAuth = () => async (dispatch: AppDispatch, _getState: unknown, api: AxiosInstance) => {
  const token = getToken();
  if (!token) {
    dispatch(requireAuthorization('NO_AUTH'));
    return;
  }

  try {
    const { data } = await api.get<AuthInfo>('/login');
    saveToken(data.token);
    dispatch(setUser(data));
  } catch {
    dispatch(requireAuthorization('NO_AUTH'));
  }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch, _getState: unknown, api: AxiosInstance) => {
  try {
    const { data } = await api.post<AuthInfo>('/login', { email, password });
    saveToken(data.token);
    dispatch(setUser(data));
  } catch (error) {
    throw error;
  }
};

export const loadOffer = (offer: Offer | null) => ({
  type: 'offer/loadOffer' as const,
  payload: offer
});

export const setOfferLoading = (isLoading: boolean) => ({
  type: 'offer/setLoading' as const,
  payload: isLoading
});

export const loadNearPlaces = (offers: Offer[]) => ({
  type: 'offer/loadNearPlaces' as const,
  payload: offers
});

export const loadReviews = (reviews: Review[]) => ({
  type: 'reviews/loadReviews' as const,
  payload: reviews
});

export const setReviewsLoading = (isLoading: boolean) => ({
  type: 'reviews/setLoading' as const,
  payload: isLoading
});

export const addReview = (review: Review) => ({
  type: 'reviews/addReview' as const,
  payload: review
});

export const fetchOffer = (id: string) => async (dispatch: AppDispatch, _getState: unknown, api: AxiosInstance) => {
  dispatch(setOfferLoading(true));
  try {
    const { data } = await api.get<Offer>(`/offers/${id}`);
    dispatch(loadOffer(data));
  } catch (error) {
    dispatch(setOfferLoading(false));
    dispatch(loadOffer(null));
    throw error;
  }
};

export const fetchNearPlaces = (id: string) => async (dispatch: AppDispatch, _getState: unknown, api: AxiosInstance) => {
  try {
    const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
    dispatch(loadNearPlaces(data));
  } catch (error) {
    // Ignore errors for near places
  }
};

export const fetchReviews = (id: string) => async (dispatch: AppDispatch, _getState: unknown, api: AxiosInstance) => {
  dispatch(setReviewsLoading(true));
  try {
    const { data } = await api.get<Review[]>(`/comments/${id}`);
    dispatch(loadReviews(data));
  } catch (error) {
    dispatch(setReviewsLoading(false));
    throw error;
  }
};

export const postReview = (id: string, review: ReviewPost) => async (dispatch: AppDispatch, _getState: unknown, api: AxiosInstance) => {
  try {
    const { data } = await api.post<Review>(`/comments/${id}`, review);
    dispatch(addReview(data));
  } catch (error) {
    throw error;
  }
};

