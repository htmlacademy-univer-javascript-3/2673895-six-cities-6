import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';

type OffersState = {
  offers: Offer[];
  isLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.offers[index] = action.payload;
      }
    }
  }
});

export const { loadOffers, setLoading, updateOffer } = offersSlice.actions;
export default offersSlice.reducer;

