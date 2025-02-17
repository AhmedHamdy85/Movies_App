import { useEffect, useState } from "react";
import { Api } from "../network/Api";
import { MagnifyingGlassIcon, HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"; 
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"; // Solid Heart Icon
import { useNavigate } from "react-router-dom";
import { ADD_TO_FAVORET } from '../Redux/Actions/FavoretAction';
import { REMOVE_FROM_FAVORET } from '../Redux/Actions/FavoretAction'; // Optional: If you want to remove items
import { useDispatch, useSelector } from "react-redux";

export default function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  useEffect(() => {
    if (search.trim() === "") {
      Api.getMovies(currentPage).then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      });
    } else {
      Api.searchForMovie(search).then((data) => {
        setMovies(data.results);
      });
    }
  }, [search, currentPage]);

  return (
    <div className="bg-dark-900 ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="relative w-full">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search movies..."
            className="w-full p-3 pl-10 border rounded-full outline-none bg-gray-900 text-white"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map((movie) => (
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
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Previous Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 border rounded-full ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800 text-white"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = currentPage <= 3 ? i + 1 : currentPage + i - 2;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-2 rounded-full border ${
                      currentPage === pageNumber ? "bg-gray-800 text-white" : "hover:bg-gray-700 text-gray-400"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 border rounded-full ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
