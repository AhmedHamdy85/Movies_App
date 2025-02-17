
import {  HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"; 
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { ADD_TO_FAVORET } from '../Redux/Actions/FavoretAction';
import { REMOVE_FROM_FAVORET } from '../Redux/Actions/FavoretAction'; 
import { useDispatch, useSelector } from "react-redux";

export default function FavoretCard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteMovies = useSelector((state) => state.favoret || []);

  // Function to toggle favorite
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



  return (
    <div className="bg-dark-900 ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
     

    {
    favoriteMovies.length === 0 ? <h1 className="text-2xl text-white">No Favorite Movies</h1> :
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {favoriteMovies.map((movie) => (
        <div key={movie.id} className="group relative">
            <div>
            <img
                onClick={() => navigate(`/details/${movie.id}`)}
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 cursor-pointer"
            />
            </div>
            <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-400">
                <span className="absolute inset-0 pointer-events-none" />
                {movie.title}
                </h3>
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
        </div>
        ))}
    </div>}

   
      </div>
    </div>
  );
}
