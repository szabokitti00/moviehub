import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import api from './api/axiosConfig';
import Layout from './components/Layout';
import Header from './components/header/Header';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';
import Reviews from './components/reviews/Reviews';
import Trailer from './components/trailer/Trailer';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {

    try {
      const response =await api.get("/api/v1/movies");

      console.log(response.data);

      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getMovieData = async (movieId) => {

    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path = "/" element = { <Layout/> }>
          <Route path='/' element = { <Home movies = { movies } /> } ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
          <Route path="*" element = {<NotFound/>}></Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
