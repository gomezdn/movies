import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FormikValues } from 'formik';
import { watchlistAPI } from '../../services/watchlistAPI';
import { ReduxState } from '../../Types';

const emptyAuthMessage = { color: '', message: '' };
const errorAuthMessage = (error: string) => ({
  color: 'brown',
  message: error,
});

function getInitialState() {
  const initialState = {
    userData: JSON.parse(window.localStorage.getItem('userData') as string) || {
      username: '',
      token: '',
    },
    loading: false,
    authMessage: emptyAuthMessage,
  };
  return initialState;
}

const register = createAsyncThunk(
  'auth/register',
  async (userData: FormikValues) => {
    return await watchlistAPI.register(userData);
  }
);

const login = createAsyncThunk('auth/login', async (userData: FormikValues) => {
  return await watchlistAPI.login(userData);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    signout: () => {
      window.localStorage.removeItem('userData');
      return getInitialState();
    },
    resetAuthMessage: (state) => {
      state.authMessage = emptyAuthMessage;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.authMessage = emptyAuthMessage;
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, { payload: { error, message } }) => {
        state.loading = false;
        if (error) {
          state.authMessage = errorAuthMessage(error);
        } else {
          state.authMessage = { color: 'green', message };
        }
      })
      .addCase(login.pending, (state) => {
        state.authMessage = emptyAuthMessage;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload: { auth, error } }) => {
        state.loading = false;
        if (error) {
          state.authMessage = errorAuthMessage(error);
        } else {
          state.authMessage = emptyAuthMessage;
          state.userData = auth;
          window.localStorage.setItem('userData', JSON.stringify(auth));
        }
      });
  },
});

const getUserData = (state: ReduxState) => state.auth.userData;
const getAuthLoading = (state: ReduxState) => state.auth.loading;
const getAuthMessage = (state: ReduxState) => state.auth.authMessage;
const { signout, resetAuthMessage } = authSlice.actions;

export {
  register,
  login,
  signout,
  resetAuthMessage,
  getUserData,
  getAuthLoading,
  getAuthMessage,
};
export default authSlice.reducer;
