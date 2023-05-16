import Header from "../header/Header";
import Lists from "../lists/Lists";
import "./container.scss";

const Container = () => {
  return (
    <div className="container">
      <Header />
      <Lists />
    </div>
  );
};

export default Container;
