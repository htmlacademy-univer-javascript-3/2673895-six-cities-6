import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from '../reducer';

type SortState = {
  sortType: SortType;
};

const initialState: SortState = {
  sortType: 'Popular'
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  }
});

export const { changeSortType } = sortSlice.actions;
export default sortSlice.reducer;

