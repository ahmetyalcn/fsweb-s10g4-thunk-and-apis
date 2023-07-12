import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  RESET_LOCAL
} from "./actions";
import { toast } from 'react-toastify';
const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
     
        if(!state.favs.includes(action.payload)){
          toast.success('Favorilere eklendi', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
           const newFavs = [...state.favs,action.payload]
      writeFavsToLocalStorage({...state,favs:newFavs})
      return({...state,favs:newFavs})
        }else{
          toast.error('Ekli olan bir öğeyi tekrar ekleyemezsiniz', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          return state;
        }
     
    case FAV_REMOVE:
      const filteredFavs = state.favs.filter(fav=> fav.id !== action.payload);
      writeFavsToLocalStorage({...state,favs:filteredFavs})
      return {...state,favs:filteredFavs};
    case FETCH_SUCCESS:
      return {...state,loading:false, current: action.payload,error: '' }

    case FETCH_LOADING:
      return {...state,loading:true,current:null, error: ''};

    case FETCH_ERROR:
      return {...state,loading:true, error: action.payload};

    case GET_FAVS_FROM_LS:
      return {...state, favs: readFavsFromLocalStorage() || []};

    case RESET_LOCAL:
      writeFavsToLocalStorage({...state,favs:[]})
      return {...state,favs:[]};
    default:
      return state;
  }
}
