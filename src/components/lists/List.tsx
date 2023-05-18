import { IListData } from "../../store/actions/types";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/listActions";
import Card from "../views/Card";

interface IListProp {
  list: IListData;
  openModal: (action: string) => void;
}
const List = ({ list, openModal }: IListProp) => {
  const dispatch = useDispatch();
  const editList: React.MouseEventHandler<HTMLElement> | undefined = async (
    event
  ) => {
    const target = event.target as HTMLInputElement;
    dispatch(actions.handleEditList(target.id));
    openModal("edit");
  };
  const deleteList: React.MouseEventHandler<HTMLElement> = (event) => {
    const target = event.target as HTMLInputElement;
    let isDelete = window.confirm("Delete this record?");
    if (isDelete) {
      dispatch(actions.handleDeletelist(target.id));
    }
  };
  return <Card list={list} deleteList={deleteList} editList={editList} />;
};

export default List;
