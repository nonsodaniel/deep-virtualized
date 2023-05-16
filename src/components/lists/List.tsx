const List = () => {
  return (
    <div className="card list-card">
      <div className="list-details">
        <span className="priority">
          Priority: <b className="text">{"High"}</b>{" "}
        </span>
        <br />
        <span className="date">
          <i className="far fa-clock"> </i>
          {` ` + new Date().toDateString()}, {new Date().toLocaleTimeString()}
        </span>
        <h3>{"A title"}</h3>

        <p>{"A description"}</p>

        <div className="category-status">
          <span className="category">{"A category"}</span>
          <span className={"A status"}>{"A status"}</span>
        </div>
      </div>
    </div>
  );
};

export default List;
