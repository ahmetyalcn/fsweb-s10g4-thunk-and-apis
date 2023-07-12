import axios from "axios";
import { nanoid } from 'nanoid'

export const RESET_LOCAL = "RESET_LOCAL";
export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS }
}
export const resetLocalStorage = () => {
  return { type: RESET_LOCAL }
}
export const addFav = (info) => {
  return { type: FAV_ADD, payload: info }
}

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id }
}

export const fetchAnother = () => dispatch => {
  dispatch({type: FETCH_LOADING});
  axios.get("https://dog.ceo/api/breeds/image/random")
  .then(res=> dispatch({type: FETCH_SUCCESS, payload:{...res.data,id: nanoid()}}))
  .catch(err=> dispatch({type:FETCH_ERROR, payload:err.message}))
}