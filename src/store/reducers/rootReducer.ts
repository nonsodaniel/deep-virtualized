import { combineReducers } from "redux";
import { APP_ACTIONS, listReducerState } from "../actions/types";
import listReducers from "./listReducers";

export type AppState = {
  lists: listReducerState;
};

export type AppActionTypes = APP_ACTIONS;

export const rootReducer = combineReducers({
  lists: listReducers,
});
