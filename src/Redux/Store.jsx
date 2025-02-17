import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux"; // Corrected import
import FavoretReducer from "./Reducers/FavoretReducer";

const store = createStore(FavoretReducer, composeWithDevTools());

export default store;


