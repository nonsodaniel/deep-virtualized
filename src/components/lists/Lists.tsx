import List from "./List";
import "./lists.scss";
import * as actions from "../../store/actions/listActions";
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IListData } from "../../store/actions/types";
import loadingImg from "../assets/loading.gif";
import networkImg from "../assets/no-connection.png";
import ListFormModal from "../modals/ListFormModal";
interface IListsProps {
  data: IListData[];
  loading: boolean;
  errorMessage: string;
  getLists: () => void;
  isOpen: boolean;
  closeModal: () => void;
  openModal: (action: string) => void;
  editData: IListData;
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
}: IListsProps) => {
  const isDataLoaded = data && data.length > 0;
  useEffect(() => {
    getLists();
  }, [getLists]);
  let select = useSelector((state) => state);
  console.log("select", select);
  // const editableData = editData && select.lists.editData;

  return (
    <div className="lists-wrap" data-testid="lists-wrap">
      <ListFormModal list={editData} isOpen={isOpen} onClose={closeModal} />
      <div className={isDataLoaded ? "lists card" : "no-list"}>
        {errorMessage === "Network Error" ? (
          <div className="text-center network-error">
            <img src={networkImg} alt="Loading animation" height="150" />
            <p>Unable to connect to the Internet</p>
            <button
              className="btn-network__error pointer"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        ) : !loading ? (
          isDataLoaded ? (
            data.map((list) => {
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
          )
        ) : (
          <div className="text-center">
            <img
              src={loadingImg}
              className="load_icon"
              alt="Loading animation"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { data, loading, errorMessage, editData } = state.lists;
  return {
    data,
    loading,
    errorMessage,
    editData,
  };
};

export default connect(mapStateToProps, actions)(Lists);
