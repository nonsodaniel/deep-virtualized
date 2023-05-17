import { useEffect, useState } from "react";
import * as actions from "../../store/actions/listActions";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { IListData, ListCategory } from "../../store/actions/types";
import "./modal.scss";
interface IListFormModalProps {
  list: IListData[];
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
  const [created, setCreated] = useState("");
  const [link, setLink] = useState("");
  let listId = "";

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
    let formdata = getFormData();

    if (listId) {
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

  const handleCheckboxChange = ({ target }: any) => {
    const { value, checked } = target;
    // The user checks the box
    if (checked) {
      setCategory([...category, value]);
    }
    // The user unchecks the box
    else {
      setCategory(category.filter((e) => e !== value));
    }
  };

  useEffect(() => {
    const setEditData = (list: Omit<IListData, "created" | "link">) => {
      if (list) {
        setName(list.name || "");
        setDesc(list.description || "");
        setCategory(list.category);
      } else {
        resetForm();
      }
    };
    //setEditData(list);
  }, [list, dispatch]);

  console.log("category", category);
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
            {listId ? "Update List" : "Create New List"}
          </h2>
        </div>
        <div className="body">
          <form onSubmit={addOrUpdateList}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="List Name"
                value={name}
                maxLength={35}
                onChange={({ target }) => setName(target.value)}
                required={true}
              />
            </div>
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
              <div>
                <input
                  type="checkbox"
                  id="health"
                  name="category"
                  value="Health"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="health">Health</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="ecommerce"
                  name="category"
                  value="E-commerce"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="ecommerce">E-commerce</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="education"
                  name="category"
                  value="Education"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="education">Education</label>
              </div>
            </div>
            <div className="form-group">
              <input
                type="url"
                className="form-control"
                id="link"
                placeholder="Drop a valid Link"
                value={link}
                maxLength={35}
                onChange={({ target }) => setLink(target.value)}
                required={true}
              />
            </div>

            <div className="btn-wrap">
              <button
                type="submit"
                className={`btn ${listId ? "btn-update" : "btn-add"}`}
              >
                {listId ? "Update List" : "Add List"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ListFormModal;
