import React from "react";
import { Link } from "react-router-dom";
import { IListData } from "../../store/actions/types";

interface ICardprops {
  list: IListData;
  editList: React.MouseEventHandler<HTMLElement>;
  deleteList: React.MouseEventHandler<HTMLElement>;
}

const Card = ({ list, editList, deleteList }: ICardprops) => {
  return (
    <div className="card list-card">
      <div className="list-details">
        <span className="priority" data-testid="category-title">
          Category: <b className="text">{list.category.join(", ")}</b>
        </span>
        <br />
        <span className="date" data-testid="list-time">
          <i className="far fa-clock"> </i>
          {` ` + new Date(list.created).toDateString()},{" "}
          {new Date(list.created).toLocaleTimeString()}
        </span>
        <h3 data-testid="list-name">{list.name}</h3>

        <p data-testid="list-description">{list.description}</p>

        <div className="category-status">
          <Link
            data-testid="category-status"
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

export default Card;
