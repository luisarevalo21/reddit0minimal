import React from "react";
import style from "./Navbar.module.css";
const Navbar = props => {
  const handleChange = event => {
    props.handleChange(event.target.value);
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
          <form onSubmit={props.handleSearch}>
            <input
              placeholder="Search"
              className={style.input}
              onChange={handleChange}
              value={props.searchValue}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>{" "}
            </button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
