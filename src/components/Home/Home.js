import React, { useEffect } from "react";
import Card from "../Card/MainCards/Card";
import style from "./Home.module.css";
import Error from "../Error/Error";

import { useSelector, useDispatch } from "react-redux";
import {
  loadRedditData,
  selectFilteredPosts,
  selectSearchTerm,
  selectHasError,
} from "../features/Reddit/redditSlice.js";

const Home = props => {
  const redditData = useSelector(selectFilteredPosts);
  const searchTerm = useSelector(selectSearchTerm);
  const error = useSelector(selectHasError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRedditData());
  }, [dispatch]);

  if (error) {
    return <Error error={error} />;
  }
  let displayedData = null;

  if (redditData.error) {
    displayedData = (
      <Error error={{ title: `No posts matching ${searchTerm}` }} />
    );
  } else if (redditData) {
    displayedData = redditData.map(data => (
      <Card
        author={data.author}
        title={data.title}
        ups={data.ups}
        index={data.index}
        key={data.permaLink}
        created_utc={data["created_utc"]}
        url_overridden_by_dest={data["url_overridden_by_dest"]}
        permaLink={data.permaLink}
        totalComments={data.totalComments}
        comments={data.comments}
      />
    ));
  }

  return <div className={style.container}>{displayedData}</div>;
};

export default Home;
