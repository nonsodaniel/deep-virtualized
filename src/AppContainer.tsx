import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Container from "./components/container/Container";

import TodoList from "./components/Virtual/lists/TodoList";

import "./components/views/views.scss";
import * as actions from "../src/store/actions/listActions";
import { AppState } from "./store/reducers/rootReducer";

interface IApp {
  getLists?: () => void;
  loading?: boolean;
}

const AppContainer = ({ loading }: IApp) => {
  const [isCacheActive, setIsCacheActive] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const computeToggle = () => {
      console.log("toggleSwitch", isCacheActive);
      if (!isCacheActive) {
        localStorage.removeItem("lists");
      }
      dispatch(actions.getLists?.(isCacheActive));
    };
    computeToggle();
  }, [isCacheActive, dispatch]);
  console.log("loading", loading);
  return (
    <>
      <div className="toggle-wrap">
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            onChange={() => setIsCacheActive(!isCacheActive)}
            disabled={loading}
          />
          <div className="toggle-switch"></div>
          <span className="toggle-label">Turn On Cache</span>
        </label>
      </div>
      <div className="App">{isCacheActive ? <Container /> : <TodoList />}</div>;
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  const { data, loading } = state.lists;
  return {
    data,
    loading,
  };
};

export default connect(mapStateToProps, actions)(AppContainer);
