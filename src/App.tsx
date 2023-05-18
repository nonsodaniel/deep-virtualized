import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import TodoList from "./components/Virtual/lists/TodoList";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <div className="App">
          <Container />
        </div> */}
        <div className="App">
          <TodoList />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
