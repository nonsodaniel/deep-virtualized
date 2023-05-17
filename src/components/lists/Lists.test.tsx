import { render, cleanup, screen } from "@testing-library/react";
import { store } from "../../store/store";
import { Provider } from "react-redux";

import Lists from "./Lists";
import List from "./List";
import { mockedListData } from "../utils/db";
import { BrowserRouter } from "react-router-dom";

const defaultProps = {
  data: mockedListData,
  loading: false,
  closeModal: jest.fn,
  openModal: jest.fn,
};

afterEach(cleanup);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Lists isOpen={false} {...defaultProps} />
      <List list={defaultProps.data[0] as any} {...defaultProps} />
    </BrowserRouter>
  </Provider>
);

describe("Completely render <Header />", () => {
  test("render the Header component without crashing", () => {
    expect(screen.getByTestId("lists-wrap")).toBeTruthy();
    expect(screen.getByTestId("category-title")).toBeTruthy();
    expect(screen.getByTestId("list-time")).toBeTruthy();
    expect(screen.getByTestId("list-description")).toBeTruthy();
    expect(screen.getAllByTestId("category-status")).toBeTruthy();
  });
});
