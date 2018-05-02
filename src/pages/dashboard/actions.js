import axios from 'axios';
import {actions} from '../../actions';
import {Constants} from '../../enums'

let {
  endpoints
} = Constants;

export const fetchMovieList = () => {
  return async dispatch => {
    try{
      let movieDetail = {};
      let response = await axios.get(endpoints.FETCH_MOVIE_LIST);
      if(response && response.data){
        response.data.forEach(async (movie)=>{
          let movieDetailRes = await axios.get(endpoints.FETCH_MOVIE_DETAIL+movie.imdbId);
          movieDetail[movie.imdbId] = movieDetailRes.data;
          dispatch({type:actions.FETCH_MOVIE_DETAIL_SUCCESS,movieDetail});
        });
      }
      dispatch({type:actions.FETCH_MOVIE_LIST_SUCCESS,movies:response.data});
    } catch(e){

    }
  }
}
