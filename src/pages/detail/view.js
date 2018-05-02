import React from "react";
import ReactDOM from "react-dom";
import logo from "../../assets/img/logo.png";
import Select from "react-select";
import "react-select/dist/react-select.css";

import { Constants } from "../../enums/index";

const feildsToDisplay = [
  "Actors",
  "Awards",
  "Country",
  "DVD",
  "Director",
  "Genre",
  "Language",
  "Metascore",
  "Plot",
  "Poster",
  "Production",
  "Rated",
  "Released",
  "Runtime",
  "Type",
  "Writer",
  "Year",
  "imdbID",
  "imdbRating",
  "imdbVotes"
];

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: this.props.movies.movies,
      movieDetail: this.props.movies.movieDetail
    };
  }

  componentWillMount = async () => {
    let { movies } = this.state;
    if (!movies.length) {
      await this.props.fetchMovieList();
    }
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.movies &&
      nextProps.movies.movies &&
      this.props.movies &&
      this.props.movies.movies &&
      this.props.movies.movies.length != nextProps.movies.movies
    ) {
      this.setState({ movies: nextProps.movies.movies });
    }

    if (
      nextProps.movies &&
      nextProps.movies.movieDetail &&
      this.props.movies &&
      this.props.movies.movieDetail &&
      Object.keys(this.props.movies.movieDetail).length !=
        Object.keys(nextProps.movies.movieDetail).length
    ) {
      this.setState({ movieDetail: nextProps.movies.movieDetail });
    }
  };

  _renderMovieDetail = movieDetail => {
    let { selectedOption } = this.state;
    let { params } = this.props.match;
    if (movieDetail && movieDetail[params.movieID]) {
      return (
        <div className="movie-detail-cont">
          <img src={movieDetail[params.movieID].Poster} />
          <div className="upper-index">
            <span className="movie-title">
              {movieDetail[params.movieID].Title}
            </span>
            <div className="movie-info-cont">
              <div className="movie-row">
                <div className="movie-label">Rating</div>
                <div className="movie-value">
                  {movieDetail[params.movieID].Ratings.map(
                    (rating, index) => {
                      return(<div>
                        <span>{rating.Source+' - '}</span>
                        <span>{rating.Value}</span>
                      </div>)
                    }
                  )}
                </div>
              </div>
              {feildsToDisplay.map((feild, index) => (
                <div key={index} className="movie-row">
                  <div className="movie-label">{feild}</div>
                  <div className="movie-value">
                    {movieDetail[params.movieID][feild]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  /* Render the component */
  render() {
    let { movieDetail, selectedOption } = this.state;
    return (
      <div className="container App">
        {this._renderMovieDetail(movieDetail)}
      </div>
    );
  }
}
