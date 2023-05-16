import {
  START_FETCH_LIST,
  SET_LIST_DATA,
  LIST_FETCH_FAILED,
  SEARCH_LIST,
  SORT_CATEGORY,
  SORT_DATE,
  IInitial_State,
  SORT_NAME,
  EDIT_LIST,
  DELETE_LIST,
  CLEAR_EDIT_LIST,
} from "../actions/types";

const INTIAL_STATE: IInitial_State = {
  allLists: [],
  data: [],
  error: false,
  loading: false,
  errorMessage: "",
  searchValue: "",
  search: true,
  currentCategory: "All",
  currentPriority: "All",
};

export const reducer = (state = INTIAL_STATE, actions: any) => {
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
        allLists: data,
        data: data,
      };
    case DELETE_LIST:
      const { id } = actions.payload;
      let newData = state.allLists.filter((data_) => data_.created !== id);
      localStorage.setItem("lists", JSON.stringify(newData));
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: newData,
      };
    case EDIT_LIST:
      const { editId } = actions.payload;
      let editData = state.allLists.find((data) => data.created === editId);
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
      let searchData =
        searchValue === ""
          ? state.allLists
          : state.allLists.filter(
              ({ name, description }) =>
                name.toLowerCase().includes(searchValue.toLowerCase()) ||
                description.toLowerCase().includes(searchValue.toLowerCase())
            );
      return {
        ...state,
        search: true,
        currentPage: 1,
        searchValue: searchValue,
        data: searchData,
      };
    case SORT_CATEGORY:
      const { activeCategory } = actions.payload;
      let sortCatData =
        activeCategory === "All"
          ? state.allLists
          : state.allLists.filter(({ category }) =>
              category.includes(activeCategory)
            );
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortCatData,
        activeCategory: activeCategory,
        currentCategory: activeCategory,
      };
    case SORT_NAME:
      const { activePriority } = actions.payload;
      let sortPrtyData =
        activePriority === "All"
          ? state.allLists
          : state.allLists.filter(({ name }) => name.includes(activePriority));
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortPrtyData,
        activePriority: activePriority,
        currentPriority: activePriority,
      };
    case SORT_DATE:
      const { activeDate } = actions.payload;
      let sortDateData =
        activeDate === "default"
          ? state.allLists
          : activeDate === "asc"
          ? [...state.allLists].sort((a, b) =>
              a.created.localeCompare(b.created)
            )
          : activeDate === "desc"
          ? [...state.allLists].sort((a, b) =>
              b.created.localeCompare(a.created)
            )
          : null;
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortDateData,
        activeOrder: activeDate,
      };

    default:
      return { ...state };
  }
};

export default reducer;
