import { useState } from "react";
import Header from "../header/Header";
import Lists from "../lists/Lists";
import "./container.scss";

const Container = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (action: string) => {
    setIsOpen(true);
    if (action === "add") {
      //   clearEditTodo();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="container">
      <Header openModal={openModal} />
      <Lists closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
};

export default Container;
