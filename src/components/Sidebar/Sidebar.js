import React from "react";
import SideCards from "../Card/SideCards/SideCards";
import "./Sidebar.css";
import Error from "../Error/Error";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSubReddits,
  allSubReddits,
  selectedSubReddit,
} from "../features/subreddit/subRedditSlice.js";

const Sidebar = props => {
  const dispatch = useDispatch();
  const subReddits = useSelector(allSubReddits);
  const subReddit = useSelector(selectedSubReddit);

  // const { selectedSubreddit, error, handleError } = props;

  useEffect(() => {
    dispatch(fetchSubReddits());
  }, [dispatch]);

  let cards = "";
  if (subReddits) {
    cards = subReddits.map(subreddit => (
      <SideCards
        key={subreddit.url}
        isLoading={props.isLoading}
        title={subreddit.title}
        avatar={subreddit.avatar}
        url={subreddit.url}
        selectedSubReddit={subReddit}
        // selectedSubreddit={selectedSubreddit}
      />
    ));
  }
  // if (error) {
  //   cards = <Error error={error} handleError={handleError} />;
  // }
  return (
    <ul className="SideCardContainer">
      <h2>Subreddits</h2>

      {cards}
    </ul>
  );
};

export default Sidebar;
