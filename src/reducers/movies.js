import { actions } from '../actions';

const initialState = {
  errors: false,
  movies:[],
  movieDetail:{}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_MOVIE_LIST_SUCCESS:
    return {
        ...state,
        movies:action.movies
      };
    case actions.FETCH_MOVIE_DETAIL_SUCCESS:
    return {
        ...state,
        movieDetail:action.movieDetail
      };
  }
  return state;
}
