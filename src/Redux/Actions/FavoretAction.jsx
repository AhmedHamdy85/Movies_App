// Action to add a movie to favorites
export const ADD_TO_FAVORET = (movie) => {
    return {
        type: 'ADD_TO_FAVORET',
        payload: movie
    }
};

// Action to remove a movie from favorites
export const REMOVE_FROM_FAVORET = (movie) => {
    return {
        type: 'REMOVE_FROM_FAVORET',
        payload: movie
    }
};
