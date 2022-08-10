import { createSlice } from '@reduxjs/toolkit';

function getInitialState() {
  const userData = window.sessionStorage.getItem('userData');

  if (userData) {
    return JSON.parse(userData);
  } else {
    return { username: '', token: '' };
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    signin: (state, { payload }) => {
      window.sessionStorage.setItem('userData', JSON.stringify(payload));
      return payload;
    },
    signout: () => {
      window.sessionStorage.removeItem('userData');
      return { username: '', token: '' };
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
