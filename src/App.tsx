import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Container from "./components/container/Container";

import TodoList from "./components/Virtual/lists/TodoList";
import { store } from "./store/store";
import "./components/views/views.scss";

function App() {
  const [toggleSwitch, setToggleSwitch] = useState<boolean>(false);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <div className="toggle-wrap">
            <label className="toggle">
              <input
                className="toggle-checkbox"
                type="checkbox"
                onChange={() => setToggleSwitch(!toggleSwitch)}
              />
              <div className="toggle-switch"></div>
              <span className="toggle-label">Turn On Cache</span>
            </label>
          </div>
        </>
        <div className="App">{toggleSwitch ? <Container /> : <TodoList />}</div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
