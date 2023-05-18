import { connect } from "react-redux";
import { AppState } from "../../../store/reducers/rootReducer";
import * as actions from "../../../store/actions/listActions";
import { IListData } from "../../../store/actions/types";
import { useEffect } from "react";
import "./todolist.scss";
import Virtualizer from "../../utils/Virtualizer";
import ListCard from "../listCard/ListCard";
import LoadingState from "../../views/LoadingState";
interface ITodoListList {
  data: IListData[];
  loading: boolean;
  getLists: () => void;
}
const TodoList = ({ data, getLists }: ITodoListList) => {
  useEffect(() => {
    getLists();
  }, [getLists]);
  console.log(data);
  return (
    <div className="container">
      <div className="inner-container">
        {data.length ? (
          <Virtualizer
            list={data}
            Component={ListCard}
            gap={4}
            keyEtractorFunction={(item: { created: string }) => item.created}
          />
        ) : (
          <LoadingState />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const { data, loading } = state.lists;
  return {
    data,
    loading,
  };
};

export default connect(mapStateToProps, actions)(TodoList);
