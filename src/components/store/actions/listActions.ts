import { uuid } from "../../utils/hepers";
import { saveToLocalStorage } from "../localstorage";
import { Dispatch } from "redux";
import {
  START_FETCH_LIST,
  SET_LIST_DATA,
  LIST_FETCH_FAILED,
  SEARCH_LIST,
  SORT_CATEGORY,
  SORT_DATE,
  SORT_ALPHABET,
  SORT_NAME,
  EDIT_LIST,
  CLEAR_EDIT_LIST,
  IListData,
} from "./types";

interface IPayload {
  lists?: IListData;
  errorMsg?: string;
}
export const getLists = () => {
  return (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_FETCH_LIST });
      const response = JSON.parse(localStorage.getItem("lists")!);

      let payload: IPayload = {};
      if (response.length) {
        payload.lists = response;
        dispatch({ type: SET_LIST_DATA, payload });
      } else {
        payload.errorMsg = "failed to fetch data";
        dispatch({ type: SET_LIST_DATA, payload });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: LIST_FETCH_FAILED,
          payload: { errorMsg: error.message },
        });
      }
    }
  };
};

export const addlist = (list: IListData) => {
  return (dispatch: Dispatch, getState: () => any) => {
    const state = getState();
    list.id = uuid();
    list.created = new Date().toISOString();
    const lists = [list, ...state.lists.allLists];
    saveToLocalStorage("lists", lists);
    dispatch({
      type: SET_LIST_DATA,
      payload: { lists },
    });
  };
};

export const updateList = (list: IListData) => {
  return (dispatch: Dispatch, getState: () => any) => {
    const state = getState();
    const lists = [...state.lists.allLists];
    let listToUpdate = lists.find(({ id }) => id === list.created);
    Object.assign(listToUpdate, list);
    saveToLocalStorage("lists", lists);
    dispatch({
      type: SET_LIST_DATA,
      payload: { lists },
    });
  };
};

export const handleEditList = (editId: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: EDIT_LIST,
      payload: { editId },
    });
  };
};
export const clearEditList = () => {
  return (dispatch: (arg0: { type: string }) => void) => {
    dispatch({
      type: CLEAR_EDIT_LIST,
    });
  };
};

export const handleDeletelist = (id: string) => {
  return (dispatch: Dispatch, getState: () => any) => {
    const state = getState();
    const lists = [...state.lists.allLists];
    let listsLeft = lists.filter((list) => id !== list.id);
    saveToLocalStorage("lists", listsLeft);
    dispatch({
      type: SET_LIST_DATA,
      payload: { lists: listsLeft },
    });
  };
};

export const handleSearchList = (searchValue: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SEARCH_LIST,
      payload: { searchValue },
    });
  };
};

export const handleSortCategory = (activeCategory: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SORT_CATEGORY,
      payload: { activeCategory },
    });
  };
};
export const handleSortPriority = (activePriority: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SORT_NAME,
      payload: { activePriority },
    });
  };
};

export const handleSortAlphabet = (activeOrder: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SORT_ALPHABET,
      payload: { activeOrder },
    });
  };
};
export const handleSortDate = (activeDate: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SORT_DATE,
      payload: { activeDate },
    });
  };
};
