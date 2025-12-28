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
    }
  }
});

export const { loadOffer, setOfferLoading, loadNearPlaces } = offerSlice.actions;
export default offerSlice.reducer;

