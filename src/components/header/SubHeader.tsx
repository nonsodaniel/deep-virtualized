import * as actions from "../../store/actions/listActions";

import { useDispatch } from "react-redux";

import "./header.scss";
import { categorList, dateList } from "../utils/db";
import { useState } from "react";
import Select from "../views/Select";

const SubHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setSearchValue(target.value);
    dispatch(actions.handleSearchList(target.value));
  };
  const sortCategory: React.ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    dispatch(actions.handleSortCategory(target.value));
  };
  const sortDate: React.ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    dispatch(actions.handleSortDate(target.value));
  };

  return (
    <header className="header" data-testid="sub-header">
      <form action="">
        <div className="subHeader-wrap">
          <div className="search-input">
            <input
              type="text"
              className="form-tag search-textbox"
              data-testid="search-textfield"
              aria-label="search-textfield"
              placeholder="Search List (Title and Description)"
              value={searchValue}
              onChange={handleSearch}
            />
            <span className="search-icon">
              <i className="fas fa-search"></i>
            </span>
          </div>
          <div className="sort-row">
            <span className="sort-items sort-title">Sort By: </span>
            <div className="select-wrap sort-items">
              <Select
                id="sort-category-option"
                value="All"
                className="select-item"
                ariaLabel="select"
                label="Category"
                htmlFor="sortCategory"
                description="Select Category"
                onChange={sortCategory}
                dataTestId="sort-category"
                options={categorList}
              />
            </div>

            <div className="select-wrap sort-items">
              <Select
                id="sort-date-option"
                value="default"
                className="select-item"
                ariaLabel="select"
                label="Date"
                htmlFor="sortDate"
                description="Select Date order"
                onChange={sortDate}
                dataTestId="sort-date"
                options={dateList}
              />
            </div>
          </div>
        </div>
      </form>
    </header>
  );
};

export default SubHeader;
