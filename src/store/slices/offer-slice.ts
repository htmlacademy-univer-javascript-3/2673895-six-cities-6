import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';

type OfferState = {
  currentOffer: Offer | null;
  nearPlaces: Offer[];
  isOfferLoading: boolean;
};

const initialState: OfferState = {
  currentOffer: null,
  nearPlaces: [],
  isOfferLoading: false
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    loadOffer: (state, action: PayloadAction<Offer | null>) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    },
    setOfferLoading: (state, action: PayloadAction<boolean>) => {
      state.isOfferLoading = action.payload;
    },
    loadNearPlaces: (state, action: PayloadAction<Offer[]>) => {
      state.nearPlaces = action.payload;
    },
    updateCurrentOffer: (state, action: PayloadAction<Offer>) => {
      if (state.currentOffer && state.currentOffer.id === action.payload.id) {
        state.currentOffer = action.payload;
      }
    },
    updateNearPlace: (state, action: PayloadAction<Offer>) => {
      const index = state.nearPlaces.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.nearPlaces[index] = action.payload;
      }
    }
  }
});

export const { loadOffer, setOfferLoading, loadNearPlaces, updateCurrentOffer, updateNearPlace } = offerSlice.actions;
export default offerSlice.reducer;

