import { connect } from "react-redux";
import { AppState } from "../../../store/reducers/rootReducer";
import * as actions from "../../../store/actions/listActions";
import { IListData } from "../../../store/actions/types";
import { useEffect } from "react";
interface ITodoListList {
  data: IListData[];
  loading: boolean;
  getLists: () => void;
}
const TodoList = ({ data, getLists }: ITodoListList) => {
  useEffect(() => {
    getLists();
  }, [getLists]);
  return (
    <div className="container">
      <div className="inner-container">Hello</div>
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
