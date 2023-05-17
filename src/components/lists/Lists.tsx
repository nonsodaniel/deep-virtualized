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
}

const Lists = ({ data, getLists, loading, errorMessage }: IListsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDataLoaded = data && data.length > 0;
  useEffect(() => {
    getLists();
  }, [getLists]);
  let select = useSelector((state) => state);

  const editData: any = [];
  const openModal = (action: string) => {
    if (action === "add") {
      //   clearEditTodo();
    }
    //setIsOpen(true);
  };

  const closeModal = () => {
    //setIsOpen(false)
  };

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
  const { data, loading, errorMessage } = state.lists;
  return {
    data,
    loading,
    errorMessage,
  };
};

export default connect(mapStateToProps, actions)(Lists);
