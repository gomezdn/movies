import axios from 'axios';
import { FormikValues } from 'formik';
import { MediaObject } from '../Types';
const BASE_URL = import.meta.env.VITE_WATCHLIST_API_URL;
const WATCHLIST_ENDPOINT = import.meta.env.VITE_USER_WATCHLIST_ENDPOINT;
const SIGNUP = import.meta.env.VITE_SIGNUP_ENDPOINT;
const LOGIN = import.meta.env.VITE_LOGIN_ENDPOINT;

function getAuthHeader(token: string) {
  return { authorization: `Bearer ${token}` };
}

async function getWatchlist(token: string) {
  const header = getAuthHeader(token);

  try {
    const axiosRes = await axios.get(`${BASE_URL}${WATCHLIST_ENDPOINT}`, {
      headers: header,
    });

    return axiosRes.data;
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

async function addMovieToWatchlist(
  movieId: string,
  token: string,
  movieObject: MediaObject
) {
  const header = getAuthHeader(token);

  try {
    const axiosRes = await axios.post(
      `${BASE_URL}${WATCHLIST_ENDPOINT}/${movieId}`,
      { movieData: movieObject },
      { headers: header }
    );
    return axiosRes.data;
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

async function removeMovieFromWatchlist(movieId: string, token: string) {
  const header = getAuthHeader(token);

  try {
    const axiosRes = await axios.delete(
      `${BASE_URL}${WATCHLIST_ENDPOINT}/${movieId}`,
      { headers: header }
    );
    return axiosRes.data;
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

async function register(userData: FormikValues) {
  try {
    const axiosRes = await axios.post(`${BASE_URL}${SIGNUP}`, userData);
    return { message: axiosRes.data.message };
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

async function login(userData: FormikValues) {
  try {
    const axiosRes = await axios.post(`${BASE_URL}${LOGIN}`, userData);
    return { auth: axiosRes.data };
  } catch (e: any) {
    return { error: e.response.data.message };
  }
}

export const watchlistAPI = {
  getWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  register,
  login,
};
