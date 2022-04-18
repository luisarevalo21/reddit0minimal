import React from "react";
import style from "./Navbar.module.css";

import { useDispatch } from "react-redux";
import { useState } from "react";

import { setSearchTerm } from "../features/Reddit/redditSlice.js";
const Navbar = props => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSearchTerm(searchValue));
    setSearchValue("");
    //put it into reddit slice instead
    // dispatch teh action to search inside of the slice
    // if (searchValue === "") {
    //   dispatch(setSearchTerm(searchValue));
    // }
    // if (searchValue) {
    //   dispatch(setSearchTerm(searchValue));
    // }
  };

  const handleChange = event => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  return (
    <div className={style["navbar-wrapper"]}>
      <header className={style.header}>
        <div className={style.logo}>
          <h2>
            Reddit <span className={style["span-min"]}>Minimal</span>
          </h2>
        </div>

        <div className={style.search}>
          <input
            placeholder="Search"
            value={searchValue}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* <SearchTerm redditHome={props.redditHome} /> */}
      </header>
    </div>
  );
};

export default Navbar;
