import { Offer } from '../types/offer';
import { AuthInfo } from '../types/auth';
import { Review, ReviewPost } from '../types/review';
import { AppDispatch } from './index';
import { AxiosInstance } from 'axios';
import { saveToken, dropToken, getToken } from '../services/api';
import { changeCity as changeCityAction } from './slices/city-slice';
import { loadOffers as loadOffersAction, setLoading as setLoadingAction } from './slices/offers-slice';
import { changeSortType as changeSortTypeAction } from './slices/sort-slice';
import { requireAuthorization as requireAuthorizationAction, setUser as setUserAction, logout as logoutAction } from './slices/user-slice';
import { loadOffer as loadOfferAction, setOfferLoading as setOfferLoadingAction, loadNearPlaces as loadNearPlacesAction } from './slices/offer-slice';
import { loadReviews as loadReviewsAction, setReviewsLoading as setReviewsLoadingAction, addReview as addReviewAction } from './slices/reviews-slice';

// Re-export actions for backward compatibility
export const changeCity = changeCityAction;
export const loadOffers = loadOffersAction;
export const setLoading = setLoadingAction;
export const changeSortType = changeSortTypeAction;
export const requireAuthorization = requireAuthorizationAction;
export const setUser = setUserAction;
export const logout = () => {
  dropToken();
  return logoutAction();
};
export const loadOffer = loadOfferAction;
export const setOfferLoading = setOfferLoadingAction;
export const loadNearPlaces = loadNearPlacesAction;
export const loadReviews = loadReviewsAction;
export const setReviewsLoading = setReviewsLoadingAction;
export const addReview = addReviewAction;

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

