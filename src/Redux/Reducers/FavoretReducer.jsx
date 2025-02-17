const initialState = {
    favoret: []
  };
  
  const FavoretReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORET':
        return {
          ...state,
          favoret: [...state.favoret, action.payload]
        };
      case 'REMOVE_FROM_FAVORET':
        return {
          ...state,
          favoret: state.favoret.filter(movie => movie.id !== action.payload.id)
        };
      default:
        return state;
    }
  };
  
  export default FavoretReducer;
  