import React, { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import Carousel from "./Carousel/Carousel";
import style from "./style.css";
import { Link } from "react-router-dom";
// import CPagination from "./CPagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../src/images/logo.png";
import CPagination from "./Pagination/CPagination";
import { useDispatch, useSelector } from 'react-redux'
import { loadingAction, movieDataAction, pageAction } from '../Components/Slice/Main'


let API_key = "&api_key=461182fa2668493a72758c55a1789c35";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
console.log(url);

// https://api.themoviedb.org/3/movie/550?api_key=461182fa2668493a72758c55a1789c35

const Main = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state.Home)
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState();
  const [content, setContent] = useState([]);
  
 

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        dispatch(movieDataAction(data.results));
      });
  }, [url_set]);

  const searchMovie = () => {
    
    {
    url =
      base_url +`/search/movie?api_key=461182fa2668493a72758c55a1789c35&query=` +search;
  
    setUrl(url);
    setSearch(" ");
    }
  };


  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=461182fa2668493a72758c55a1789c35&page=${selector.page}&adult=true`
    );

    setContent(data.results);
  };

  useEffect(() => {
    dispatch(loadingAction(true));
    setTimeout(() => {
      fetchTrending();
    }, 100);
  }, [selector.page]);

  const nextPage = () => {
    dispatch(pageAction(selector.page + 1));
  };

  const prevPage = () => {
    dispatch(pageAction(selector.page - 1));
  };

  const pageNumber = (i) => {
    dispatch(pageAction(i));
  };

  

  return (
    <div className="container-fluid">
      <div className="main-fluid">
        <div className="header">
          <div className="movie-nav-logo">
            <img src={logo}></img>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
              onChange={(e) => {
                setSearch(e.target.value);

              }}
              
              value={search}
            ></input>
            <button className="btn btn-primary" onClick={searchMovie}>
              <span class="fa fa-search"></span>
            </button>
            <Link to="/">
              <button className="nav-btn">Logout</button>
            </Link>
          </div>
        </div>

        <Carousel />

        <div>
          <h1 id="head-txt">Trending</h1>
        </div>

        <div className="container">
          {selector.movieData.length == 0 ? (
            <p className="notfound">Not Found</p>
          ) : (
            content.map((res, pos) => {
              return <Card info={res} key={pos} />;
            })
          )}
        </div>
        <div>
          <CPagination
            prevPage={prevPage}
            nextPage={nextPage}
            goToCurrentPage={pageNumber}
          />
        </div>
      </div>
    </div>
  );
};
export default Main;
