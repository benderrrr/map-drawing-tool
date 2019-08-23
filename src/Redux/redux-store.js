import {applyMiddleware, createStore} from "redux";
import {combineReducers} from "redux/es/redux";
import mapReducer from "./mapReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    map: mapReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;