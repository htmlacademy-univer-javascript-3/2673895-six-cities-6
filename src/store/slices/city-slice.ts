import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

type CityState = {
  city: City;
};

const initialState: CityState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  }
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    }
  }
});

export const { changeCity } = citySlice.actions;
export default citySlice.reducer;

