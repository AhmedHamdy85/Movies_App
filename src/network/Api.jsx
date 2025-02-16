

export const Api = {

    getMovies: async (currentPage) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1c61f7854caf371b34a23ef611f0efed&language=en-US&page=${currentPage}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
        return [];
      }
    },

  searchForMovie: async (MovieName) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=1c61f7854caf371b34a23ef611f0efed&query=${MovieName}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=1c61f7854caf371b34a23ef611f0efed&language=en-US`
        
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}
