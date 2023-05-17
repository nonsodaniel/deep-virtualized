import { uuid } from "../../components/utils/hepers";
import { saveToLocalStorage } from "../localstorage";
import { Dispatch } from "redux";
import {
  START_FETCH_LIST,
  SET_LIST_DATA,
  LIST_FETCH_FAILED,
  SEARCH_LIST,
  SORT_CATEGORY,
  SORT_DATE,
  EDIT_LIST,
  CLEAR_EDIT_LIST,
  IListData,
} from "./types";
import { Get } from "../../config/apiServices";

interface IPayload {
  lists?: IListData;
  errorMsg?: string;
}

const url = `https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates`;

export const getLists = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_FETCH_LIST });
      const localList = JSON.parse(localStorage.getItem("lists")!);
      let payload: IPayload = {};
      if (localList) {
        payload.lists = localList;
        return dispatch({ type: SET_LIST_DATA, payload });
      } else {
        const response = await Get(url);
        const { status } = response;

        if (status === 200) {
          payload.lists = response.data;
          localStorage.setItem(
            "lists",
            JSON.stringify(response.data.splice(0, 200))
          );
          dispatch({ type: SET_LIST_DATA, payload });
        } else {
          payload.errorMsg = "failed to fetch data";
          dispatch({ type: SET_LIST_DATA, payload });
        }
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

export const addlist = (list: Omit<IListData, "created" | "link">) => {
  return (dispatch: Dispatch, getState: () => any) => {
    const state = getState();
    list.id = uuid();
    const lists = [list, ...state.lists.allLists];
    saveToLocalStorage("lists", lists);
    dispatch({
      type: SET_LIST_DATA,
      payload: { lists },
    });
  };
};

export const updateList = (list: Omit<IListData, "created">) => {
  return (dispatch: Dispatch, getState: () => any) => {
    const state = getState();
    const lists = [...state.lists.allLists];
    let listToUpdate = lists.find(({ id }) => id === list.id);
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
  return (dispatch: Dispatch) => {
    console.log("fired");
    dispatch({
      type: CLEAR_EDIT_LIST,
    });
  };
};

export const handleDeletelist = (id: string) => {
  return (dispatch: Dispatch, getState: () => any) => {
    const state = getState();
    const lists = [...state.lists.allLists];
    let listsLeft = lists.filter((list) => id !== list.created);
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

export const handleSortDate = (activeDate: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SORT_DATE,
      payload: { activeDate },
    });
  };
};
