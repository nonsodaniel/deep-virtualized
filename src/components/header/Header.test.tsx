import Header from "./Header";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import store from "../../store/store";
import { Provider } from "react-redux";
import SubHeader from "./SubHeader";

const defaultProps = {
  openModal: jest.fn,
};

afterEach(cleanup);

render(
  <Provider store={store}>
    <Header {...defaultProps} />
    <SubHeader />
  </Provider>
);

const setup = () => {
  const input = render(
    <Provider store={store}>
      <Header {...defaultProps} />
      <SubHeader />
    </Provider>
  ).getByLabelText("search-textfield");
  return {
    input,
  };
};

describe("Completely render <Header />", () => {
  test("render the Header component without crashing", () => {
    expect(screen.getAllByTestId("header")).toHaveLength(1);
    expect(screen.getAllByTestId("search-textfield")).toBeTruthy();
    // expect(screen.getByPlaceholderText(/Search List (Title and Description)/));
    expect(screen.getAllByTestId("sort-category")).toBeTruthy();
    expect(screen.getAllByTestId("sort-date")).toBeTruthy();
  });
  //   test("It should allow users type their search texts", () => {
  //     afterEach(cleanup);
  //     const { input } = setup();
  //     fireEvent.change(input, { target: { value: "Some list" } });
  //     expect((input as HTMLInputElement).value).toBe("Some list");
  //   });

  //   test("It should allow the search text to be deleted", () => {
  //     const { input } = setup();
  //     fireEvent.change(input, { target: { value: "deleted texts" } });
  //     expect((input as HTMLInputElement).value).toBe("deleted texts");
  //     fireEvent.change(input, { target: { value: "" } });
  //     expect((input as HTMLInputElement).value).toBe("");
  //   });
});
