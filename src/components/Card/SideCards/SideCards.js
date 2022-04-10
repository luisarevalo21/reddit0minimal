import React from "react";
import "./SideCards.css";
const SideCards = props => {
  const { url, title, avatar, selectedSubreddit } = props;

  const handleClick = () => {
    props.handleClick(url);
  };

  return (
    <li className="list" key={props.subreddit}>
      <button
        className={`SideCards ${url === selectedSubreddit ? "active" : ""} `}
        onClick={handleClick}
      >
        <img src={avatar} className="avatar" alt={avatar} />
        <p>{title}</p>
      </button>
    </li>
  );
};

export default SideCards;
