import List from "./List";
import "./lists.scss";

const Lists = () => {
  const arr = Array.from(Array(5));
  return (
    <div className="lists-wrap" data-testid="lists-wrap">
      <div className="list">
        {arr.map((o) => (
          <List key={Math.random()} />
        ))}
      </div>
    </div>
  );
};

export default Lists;
