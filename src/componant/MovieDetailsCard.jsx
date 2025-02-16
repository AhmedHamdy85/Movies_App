import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../network/Api";

export default function MovieDetailsCard() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

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
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 font-bold text-lg">{movie.vote_average}</span>
          <span className="text-gray-400 text-sm ml-2">/ 10</span>
        </div>
        <p className="text-gray-300 mt-3 text-sm">{movie.overview}</p>
      </div>
    </div>
  );
}
