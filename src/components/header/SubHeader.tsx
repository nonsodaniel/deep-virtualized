import * as actions from "../../store/actions/listActions";

import { useDispatch } from "react-redux";

import "./header.scss";
import { categorList } from "../utils/db";
import { useState } from "react";

const SubHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleSearch = ({ target }: any) => {
    setSearchValue(target.value);
    dispatch(actions.handleSearchList(target.value));
  };
  const sortCategory = ({ target }: any) => {
    dispatch(actions.handleSortCategory(target.value));
  };
  const sortDate = ({ target }: any) => {
    dispatch(actions.handleSortDate(target.value));
  };

  return (
    <header className="header" data-testid="header">
      <form action="">
        <div className="header-wrap">
          <div className="search-input">
            <input
              type="text"
              className="form-tag search-textbox"
              data-testid="search-textfield"
              aria-label="search-textfield"
              placeholder="Search Todo (Title and Description)"
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
              <label htmlFor="sortCategory" className="sort-label">
                Category
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortCategory}
                data-testid="sort-category"
              >
                <option value="All"> Select Category</option>
                {categorList.map((catgry) => {
                  let { id, value } = catgry;
                  return (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select-wrap sort-items">
              <label htmlFor="sortDate" className="sort-label">
                Date
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortDate}
                data-testid="sort-date"
              >
                {}
                <option value="default">Select Date order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
};

export default SubHeader;
