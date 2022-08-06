import axios from 'axios';
import { FormikValues } from 'formik';
const BASE_URL = import.meta.env.VITE_WATCHLIST_API_URL;
const GET_WATCHLIST = import.meta.env.VITE_USER_WATCHLIST_ENDPOINT;
const SIGNUP = import.meta.env.VITE_SIGNUP_ENDPOINT;
const LOGIN = import.meta.env.VITE_LOGIN_ENDPOINT;

async function getWatchlist(userEmail: string) {
  const axiosRes = await axios.get(`${BASE_URL}${GET_WATCHLIST}/${userEmail}`);

  return axiosRes.data;
}

async function register(userData: FormikValues) {
  try {
    await axios.post(`${BASE_URL}${SIGNUP}`, userData);
  } catch (e) {
    console.log(e);
  }
}

async function login(userData: FormikValues) {
  try {
    const axiosRes = await axios.post(`${BASE_URL}${LOGIN}`, userData);

    return axiosRes.data;
  } catch (e) {
    console.log(e);
  }
}

export { getWatchlist, register, login };
