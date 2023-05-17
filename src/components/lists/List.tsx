import { IListData } from "../../store/actions/types";
import { Link } from "react-router-dom";

interface IListProp {
  list: IListData;
}
const List = ({ list }: IListProp) => {
  console.log(list.category);
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
        </div>
      </div>
    </div>
  );
};

export default List;
