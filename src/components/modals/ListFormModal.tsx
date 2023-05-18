import { useEffect, useState } from "react";
import * as actions from "../../store/actions/listActions";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { IListData, ListCategory } from "../../store/actions/types";
import "./modal.scss";
import Input from "../views/Input";
import Button from "../views/Button";
import Checkbox from "../views/Checkbox";
interface IListFormModalProps {
  list: IListData;
  isOpen: boolean;
  onClose: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: `rgba(0, 0, 0, 0.25) 0px 12px 15px 0px`,
    background: "white",
    border: "none",
  },
};

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const ListFormModal = ({ list, isOpen, onClose }: IListFormModalProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState<ListCategory[]>([]);
  const [link, setLink] = useState("");
  const getFormData = () => {
    return {
      name,
      description,
      category,
      link,
      created: new Date(),
    };
  };

  const addOrUpdateList = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!category.length) return alert("Kindly select one ore more Category");
    let formdata = getFormData();

    if (list) {
      dispatch(actions.updateList({ ...list, ...formdata }));
      resetForm();
      handleClose();
      return;
    }
    dispatch(actions.addlist(formdata));
    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setName("");
    setDesc("");
    setLink("");
    setCategory([]);
  };

  const handleClose = () => {
    onClose();
  };

  const handleCheckboxChange = (event: { target: HTMLInputElement }) => {
    const value = (event.target as HTMLInputElement).value;
    const checked = (event.target as HTMLInputElement).checked;
    // The user checks the box
    if (checked) {
      setCategory([...category, value as ListCategory]);
    }
    // The user unchecks the box
    else {
      setCategory(category.filter((e) => e !== value));
    }
  };

  useEffect(() => {
    const setEditData = (list: Omit<IListData, "created">) => {
      if (list) {
        setName(list.name || "");
        setDesc(list.description || "");
        setCategory(list.category);
        setLink(list.link);
      } else {
        resetForm();
      }
    };
    setEditData(list);
  }, [list, dispatch]);
  return (
    <div className="list-modal">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="header">
          <span onClick={onClose} className="text-right pointer">
            <i className="far fa-times-circle close-modal"></i>
          </span>
          <h2 className="text-center">
            {list ? "Update List" : "Create New List"}
          </h2>
        </div>
        <div className="body">
          <form onSubmit={addOrUpdateList}>
            <Input
              type="text"
              id="name"
              className="form-control"
              value={name}
              placeholder={"List Name"}
              required={true}
              onChange={(event) => setName(event.target.value)}
            />
            <div className="form-group">
              <textarea
                className="form-control"
                id="description"
                rows={3}
                placeholder="Type your List Description here... Max character (150)"
                value={description}
                onChange={({ target }) => setDesc(target.value)}
                maxLength={150}
                required={true}
              ></textarea>
            </div>
            <div className="form-group checkbox-group">
              <Checkbox
                type="checkbox"
                id="health"
                name="category"
                value="Health"
                onChange={handleCheckboxChange}
                checked={category.includes("Health")}
              />

              <Checkbox
                type="checkbox"
                id="ecommerce"
                name="category"
                value="E-commerce"
                onChange={handleCheckboxChange}
                checked={category.includes("E-commerce")}
              />

              <Checkbox
                type="checkbox"
                id="education"
                name="category"
                value="Education"
                onChange={handleCheckboxChange}
                checked={category.includes("Education")}
              />
            </div>
            <Input
              type="url"
              className="form-control"
              id="link"
              placeholder="Drop a valid Link"
              value={link}
              onChange={({ target }) => setLink(target.value)}
              required={true}
            />
            <div className="btn-wrap">
              <Button
                type="submit"
                className={`btn ${list ? "btn-update" : "btn-add"}`}
                text={list ? "Update List" : "Add List"}
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ListFormModal;
