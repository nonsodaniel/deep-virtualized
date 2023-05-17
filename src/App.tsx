import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Container from "./components/container/Container";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Container />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
