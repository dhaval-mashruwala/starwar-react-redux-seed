import React from "react";
import ReactDOM from "react-dom";
import logo from "../../assets/img/logo.png";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Constants } from "../../enums/index";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.sortOptions = [
      { value: "episode", label: "Episode" },
      { value: "release", label: "Release" },
      { value: "machete", label: "Machete" }
    ];
    this.state = {
      movies: this.props.movies.movies,
      movieDetail: this.props.movies.movieDetail,
      selectedOption:this.sortOptions[0]
    };
  }

  componentWillMount = () => {
    this.props.fetchMovieList();
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

  handleChange = (selectedOption)=>{
    this.setState({selectedOption});
  }

  _renderSelect = ()=>{
    let {selectedOption} = this.state;
    return (
      <div className="sort-select">
        <span className="select-title">Sort movies By</span>
        <Select
          name="sort-by"
          value={selectedOption}
          onChange={this.handleChange}
          options={this.sortOptions}
        />
      </div>
    );
  }

  _renderMovie = (movies, movieDetail) => {
    let {selectedOption} = this.state;
    movies = movies.length && movies.sort((curr,next)=>curr.position[selectedOption.value]>next.position[selectedOption.value])
    if(movies){
      return movies.map((movie,index) => {
        if (movieDetail[movie.imdbId] && movieDetail[movie.imdbId].Poster) {
          return (
            <div
              key={index}
              className="movie-cont"
              style={{
                backgroundImage: `url(${movieDetail[movie.imdbId].Poster})`
              }}
              onClick={()=>{this.props.history.push("/"+movie.imdbId)}}
            >
              <span className="movie-title">
                {movieDetail[movie.imdbId].Title}
              </span>
            </div>
          );
        }
      });
    }
  };

  /* Render the component */
  render() {
    let { movies, movieDetail,selectedOption } = this.state;
    return (
      <div className="container">
        <h2 className="main-logo">
          <img src={logo} />
        </h2>
        {this._renderSelect()}
        <div className="main">
          <div className="movies-cont">
            {this._renderMovie(movies, movieDetail)}
          </div>
        </div>
      </div>
    );
  }
}
