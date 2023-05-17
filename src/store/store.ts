import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import {
  createStore as reduxCreateStore,
  applyMiddleware,
  Middleware,
  compose,
  ActionCreator,
} from "redux";
import thunk, { ThunkDispatch, ThunkAction } from "redux-thunk";

import { rootReducer, AppState, AppActionTypes } from "./reducers/rootReducer";

const middlewares: Middleware[] = [thunk];
const composeEnhancers =
  (typeof window !== "undefined" &&
    ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose)) ||
  compose;

export const store = reduxCreateStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useTypedDispatch: () => ThunkDispatch<
  AppState,
  void,
  AppActionTypes
> = () => {
  const dispatch: ThunkDispatch<AppState, void, AppActionTypes> = useDispatch();
  return dispatch;
};

export type AppActionCreator = ActionCreator<AppActionTypes>;

export type ThunkAppActionCreator<R> = ActionCreator<
  ThunkAction<R, AppState, void, AppActionTypes>
>;

export type ThunkActionCreator<R> = ActionCreator<
  ThunkAction<R, AppState, void, AppActionTypes>
>;
