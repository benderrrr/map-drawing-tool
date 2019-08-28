import {createStore} from "redux";
import {combineReducers} from "redux/es/redux";
import mapReducer from "./mapReducer";

let reducers = combineReducers({
    map: mapReducer,
});

let store = createStore(reducers);

export default store;