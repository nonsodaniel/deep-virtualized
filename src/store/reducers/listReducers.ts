import {
  START_FETCH_LIST,
  SET_LIST_DATA,
  LIST_FETCH_FAILED,
  SEARCH_LIST,
  SORT_CATEGORY,
  SORT_DATE,
  listReducerState,
  EDIT_LIST,
  DELETE_LIST,
  CLEAR_EDIT_LIST,
  APP_ACTIONS,
  ListCategory,
} from "../actions/types";

const INTIAL_STATE: listReducerState = {
  data: [],
  error: false,
  loading: false,
  errorMessage: "",
  searchValue: "",
  search: false,
  searchResults: null,
  currentCategory: "All",
  editData: null,
};

export const reducer = (state = INTIAL_STATE, actions: APP_ACTIONS) => {
  switch (actions.type) {
    case START_FETCH_LIST:
      return { ...state, loading: true };
    case SET_LIST_DATA:
      let data = actions.payload.lists;
      return {
        ...state,
        error: false,
        loading: false,
        errorMessage: "",
        data,
      };
    case DELETE_LIST:
      const { id } = actions.payload;
      let newData = state.data.filter((data_) => data_.created !== id);
      localStorage.setItem("lists", JSON.stringify(newData));
      return {
        ...state,
        search: false,
        searchValue: "",
        data: newData,
      };
    case EDIT_LIST:
      const { editId } = actions.payload;
      let editData = state.data.find((data) => data.created === editId);
      return {
        ...state,
        editData,
      };
    case CLEAR_EDIT_LIST:
      return {
        ...state,
        editData: null,
      };
    case LIST_FETCH_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: actions.payload.errorMsg,
        loading: false,
      };
    case SEARCH_LIST:
      const { searchValue } = actions.payload;
      if (!searchValue) {
        return {
          ...state,
          search: false,
          searchResults: null,
        };
      }

      const searchResults = state.data.filter(
        ({ name, description }) =>
          name.toLowerCase().includes((searchValue as string).toLowerCase()) ||
          description
            .toLowerCase()
            .includes((searchValue as string).toLowerCase())
      );

      return {
        ...state,
        search: true,
        searchValue: searchValue,
        searchResults,
      };
    case SORT_CATEGORY:
      const { activeCategory } = actions.payload;
      let sortCatData =
        activeCategory === "All"
          ? state.data
          : state.data.filter(({ category }) =>
              category.includes(activeCategory as ListCategory)
            );
      return {
        ...state,
        search: false,
        searchValue: "",
        data: sortCatData,
        activeCategory: activeCategory,
        currentCategory: activeCategory,
      };
    case SORT_DATE:
      const { activeDate } = actions.payload;
      let sortDateData =
        activeDate === "default"
          ? state.data
          : activeDate === "Ascending"
          ? [...state.data].sort((a, b) => a.created.localeCompare(b.created))
          : activeDate === "Descending"
          ? [...state.data].sort((a, b) => b.created.localeCompare(a.created))
          : null;
      return {
        ...state,
        search: false,
        searchValue: "",
        data: sortDateData,
        activeOrder: activeDate,
      };

    default:
      return { ...state };
  }
};

export default reducer;
