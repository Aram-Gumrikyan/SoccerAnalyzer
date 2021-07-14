import { createStore } from "redux";
import leaguesReducer from "./reducers/leaguesReducer";

const store = createStore(
	leaguesReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
