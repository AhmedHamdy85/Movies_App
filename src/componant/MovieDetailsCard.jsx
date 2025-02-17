import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../network/Api";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"; // Solid Heart Icon
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"; // Outline Heart Icon

import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_FAVORET, REMOVE_FROM_FAVORET } from "../Redux/Actions/FavoretAction";

export default function MovieDetailsCard() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);


  const favoriteMovies = useSelector((state) => state.favoret || []);
const dispatch = useDispatch();

  const toggleFavorite = (movie) => {
    const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      // If the movie is already in the favorites, remove it
      dispatch(REMOVE_FROM_FAVORET(movie));
    } else {
      // If the movie is not in the favorites, add it
      dispatch(ADD_TO_FAVORET(movie));
    }
  };
  useEffect(() => {
    Api.getMovieDetails(id).then((data) => {
      setMovie(data);
    });
  }, [id]);

  if (!movie) {
    return <p className="text-center text-gray-400">Loading movie details...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden ">
     <img
  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
  alt={movie.title}
  className="w-full rounded-lg object-cover"
/>

      <div className="p-5">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p className="text-gray-400 text-sm">Release Date: {movie.release_date}</p>
        <div className="flex justify-between items-center mt-2">
          <div>


          <span className="text-yellow-400 font-bold text-lg">{movie.vote_average}</span>
          <span className="text-gray-400 text-sm ml-2">/ 10</span>
          </div>
          <div onClick={(e) => { 
                  e.stopPropagation(); 
                  toggleFavorite(movie); 
                 }}>
                  {favoriteMovies.some((fav) => fav.id === movie.id) ? (
                    <SolidHeartIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <OutlineHeartIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
                  )}
                </div>
        </div>
        <p className="text-gray-300 mt-3 text-sm">{movie.overview}</p>
      </div>
    </div>
  );
}
