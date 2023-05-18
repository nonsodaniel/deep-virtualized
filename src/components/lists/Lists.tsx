import List from "./List";
import "./lists.scss";
import * as actions from "../../store/actions/listActions";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { IListData } from "../../store/actions/types";

import networkImg from "../assets/no-connection.png";
import ListFormModal from "../modals/ListFormModal";
import { AppState } from "../../store/reducers/rootReducer";
import LoadingState from "../views/LoadingState";
interface IListsProps {
  data: IListData[];
  loading: boolean;
  errorMessage: string;
  getLists: () => void;
  isOpen: boolean;
  closeModal: () => void;
  openModal: (action: string) => void;
  editData: IListData | null;
  searchResults: IListData[] | null;
}

const Lists = ({
  data,
  getLists,
  loading,
  errorMessage,
  isOpen,
  closeModal,
  openModal,
  editData,
  searchResults,
}: IListsProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getLists();
  }, [getLists]);

  const viewData = searchResults === null ? data : searchResults;
  const isDataLoaded = viewData && viewData.length > 0;

  return (
    <div className="lists-wrap" data-testid="lists-wrap">
      {isOpen && editData && (
        <ListFormModal list={editData} isOpen={isOpen} onClose={closeModal} />
      )}
      <div className={isDataLoaded ? "lists card" : "no-list"}>
        {!loading && !isDataLoaded && errorMessage === "Network Error" && (
          <div className="text-center network-error">
            <img src={networkImg} alt="Loading animation" height="150" />
            <p>Unable to connect to the Internet</p>
            <button
              className="btn-network__error pointer"
              onClick={() => dispatch(actions.getLists(false))}
            >
              Refresh
            </button>
          </div>
        )}
        {loading && !isDataLoaded && errorMessage && <LoadingState />}
        {!loading && isDataLoaded ? (
          viewData.map((list) => {
            return (
              <List
                key={Math.floor(Math.random() * Date.now())}
                list={list}
                openModal={openModal}
              />
            );
          })
        ) : (
          <p className="text-center">No Data Available!</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const { data, loading, errorMessage, editData, searchResults } = state.lists;

  return {
    data,
    loading,
    errorMessage,
    editData,
    searchResults,
  };
};

export default connect(mapStateToProps, actions)(Lists);
