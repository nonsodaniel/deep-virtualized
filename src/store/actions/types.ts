export const START_FETCH_LIST = "START_FETCH_LIST";
export const SET_LIST_DATA = "SET_LIST_DATA";
export const LIST_FETCH_FAILED = "LIST_FETCH_FAILED";
export const SEARCH_LIST = "SEARCH_LIST";
export const SORT_CATEGORY = "SORT_CATEGORY";
export const SORT_DATE = "SORT_DATE";
export const DELETE_LIST = "DELETE_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const CLEAR_EDIT_LIST = "CLEAR_EDIT_LIST";

export type ListCategory = "Education" | "E-commerce" | "Health";

export interface IListData {
  id?: string;
  category: ListCategory[];
  description: string;
  name: string;
  link: string;
  created: string;
}

export interface listReducerState {
  data: IListData[];
  searchValue: string | undefined;
  search: boolean;
  currentCategory: string;
  error: boolean;
  loading: boolean;
  errorMessage: string;
  editData: IListData | null;
  searchResults: IListData[] | null;
}

export interface APP_ACTIONS {
  type: string;
  payload: {
    lists?: IListData[];
    errorMsg?: string;
    id?: string;
    editId?: string;
    searchValue?: string;
    activeCategory: string;
    activeDate: string;
  };
}
