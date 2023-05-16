import List from "./List";
import "./lists.scss";
import * as actions from "../../store/actions/listActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { IListData } from "../../store/actions/types";
interface IListsProps {
  data: IListData;
  getLists: () => void;
}

const Lists = ({ data, getLists }: IListsProps) => {
  const arr = Array.from(Array(100));

  useEffect(() => {
    getLists();
  }, [getLists]);

  return (
    <div className="lists-wrap" data-testid="lists-wrap">
      <div className="list card">
        {arr.map((o) => (
          <List key={Math.random()} />
        ))}
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
