import React from "react";
import "./SideCards.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedSubReddit,
  setSelectedSubReddit,
  loadRedditData,
} from "../../features/Reddit/redditSlice.js";

const SideCards = props => {
  const dispatch = useDispatch();
  const choosenSubReddit = useSelector(selectedSubReddit);

  const { url, title, avatar } = props;

  const handleClick = () => {
    dispatch(setSelectedSubReddit(url));
    dispatch(loadRedditData(url));
  };

  return (
    <li className="list" key={props.subreddit}>
      <button
        className={`SideCards ${url === choosenSubReddit ? "active" : ""} `}
        onClick={handleClick}
      >
        <img src={avatar} className="avatar" alt={avatar} />
        <p>{title}</p>
      </button>
    </li>
  );
};

export default SideCards;
