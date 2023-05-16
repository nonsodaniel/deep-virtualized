import List from "./List";
import "./lists.scss";

const Lists = () => {
  const arr = Array.from(Array(100));
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

export default Lists;
