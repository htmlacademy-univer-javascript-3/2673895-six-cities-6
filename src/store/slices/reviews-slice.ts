import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types/review';

type ReviewsState = {
  reviews: Review[];
  isReviewsLoading: boolean;
};

const initialState: ReviewsState = {
  reviews: [],
  isReviewsLoading: false
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    loadReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
      state.isReviewsLoading = false;
    },
    setReviewsLoading: (state, action: PayloadAction<boolean>) => {
      state.isReviewsLoading = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    }
  }
});

export const { loadReviews, setReviewsLoading, addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;

