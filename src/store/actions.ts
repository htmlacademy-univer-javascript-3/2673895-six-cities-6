import { City, SortType } from './reducer';
import { Offer } from '../types/offer';
import { AppDispatch } from './index';
import { AxiosInstance } from 'axios';

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

