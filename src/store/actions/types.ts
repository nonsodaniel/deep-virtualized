export const START_FETCH_LIST = "START_FETCH_LIST";
export const SET_LIST_DATA = "SET_LIST_DATA";
export const LIST_FETCH_FAILED = "LIST_FETCH_FAILED";
export const SEARCH_LIST = "SEARCH_LIST";
export const SORT_CATEGORY = "SORT_CATEGORY";
export const SORT_ALPHABET = "SORT_ALPHABET";
export const SORT_DATE = "SORT_DATE";
export const SORT_NAME = "SORT_NAME";
export const DELETE_LIST = "DELETE_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const CLEAR_EDIT_LIST = "CLEAR_EDIT_LIST";

export type ListCategory = "Education" | "E-commerce" | "Health";

export interface IListData {
  id?: string;
  category: ListCategory;
  description: string;
  name: string;
  link: string;
  created: string;
}

export interface IInitial_State {
  allLists: IListData[];
  data: IListData[];
  error: boolean;
  loading: boolean;
  errorMessage?: string;
  searchValue?: string;
  search: boolean;
  currentCategory: string;
  currentPriority: string;
}
