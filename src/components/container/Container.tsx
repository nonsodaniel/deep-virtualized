import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearEditList } from "../../store/actions";
import Header from "../header/Header";
import Lists from "../lists/Lists";
import "./container.scss";

const Container = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const openModal = (action: string) => {
    setIsOpen(true);
    if (action === "add") {
      return dispatch(clearEditList());
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="container">
      <Header openModal={openModal} />
      <Lists closeModal={closeModal} openModal={openModal} isOpen={isOpen} />
    </div>
  );
};

export default Container;
