import { Provider } from "react-redux";
import Container from "./components/container/Container";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container />
      </div>
    </Provider>
  );
}

export default App;
