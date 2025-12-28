import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, AuthInfo } from '../../types/auth';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
};

const initialState: UserState = {
  authorizationStatus: 'UNKNOWN',
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthInfo>) => {
      state.user = action.payload;
      state.authorizationStatus = 'AUTH';
    },
    logout: (state) => {
      state.user = null;
      state.authorizationStatus = 'NO_AUTH';
    }
  }
});

export const { requireAuthorization, setUser, logout } = userSlice.actions;
export default userSlice.reducer;

