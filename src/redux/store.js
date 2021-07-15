import { createStore, combineReducers } from "redux";
import leaguesReducer from "./reducers/leaguesReducer";
import compareItemsReducer from "./reducers/compareItemsReducer";

const rootReducer = combineReducers({ leagues: leaguesReducer, compareItems: compareItemsReducer });

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
