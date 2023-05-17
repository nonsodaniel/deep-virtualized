import { IListData } from "../../store/actions/types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/listActions";

interface IListProp {
  list: IListData;
  openModal: (action: string) => void;
}
const List = ({ list, openModal }: IListProp) => {
  const dispatch = useDispatch();
  const editList = async ({ target: { id } }: any) => {
    dispatch(actions.handleEditList(id));
    openModal("edit");
  };
  const deleteList = ({ target: { id } }: any) => {
    let isDelete = window.confirm("Delete this record?");
    if (isDelete) {
      dispatch(actions.handleDeletelist(id));
    }
  };
  return (
    <div className="card list-card">
      <div className="list-details">
        <span className="priority">
          Category: <b className="text">{list.category.join(", ")}</b>
        </span>
        <br />
        <span className="date">
          <i className="far fa-clock"> </i>
          {` ` + new Date(list.created).toDateString()},{" "}
          {new Date(list.created).toLocaleTimeString()}
        </span>
        <h3>{list.name}</h3>

        <p>{list.description}</p>

        <div className="category-status">
          <Link
            className="category"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(list.link);
            }}
          >
            Visit Site
          </Link>
          <div className="actions">
            <span className="edit-wrap">
              <i
                className="fas fa-edit edit pointer"
                onClick={editList}
                id={list.created}
              ></i>
            </span>
            <span className="delete-wrap">
              <i
                className="fas fa-trash-alt delete pointer"
                onClick={deleteList}
                id={list.created}
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
