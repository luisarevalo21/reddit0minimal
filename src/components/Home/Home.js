import React from "react";

import Card from "../Card/MainCards/Card";
import style from "./Home.module.css";

import Spinner from "../Spinner/Spinner";
const Home = props => {
  const {
    redditHome,
    isLoading,
    fetchComments,
    comments,
    isLoadingComments,
    selectedPermaLink,
    searchValue,
    filteredHomeData,
  } = props;

  const fetchingComments = permaLink => {
    console.log(permaLink);
    fetchComments(permaLink);
  };

  let displayedData = redditHome.map(data => (
    <Card
      {...data}
      fetchComments={fetchingComments}
      comments={comments}
      isLoadingComments={isLoadingComments}
      permaLink={data.permaLink}
      selectedPermaLink={selectedPermaLink}
    />
  ));

  if (filteredHomeData) {
    displayedData = filteredHomeData.map(data => (
      <Card
        {...data}
        fetchComments={fetchingComments}
        comments={comments}
        isLoadingComments={isLoadingComments}
        permaLink={data.permaLink}
        selectedPermaLink={selectedPermaLink}
        totalComments={data.totalComments}
      />
    ));
  }
  let noResults = "";
  if (filteredHomeData !== null && filteredHomeData.length === 0) {
    noResults = (
      <div>
        <h2>No posts matching "{searchValue}"</h2>

        <button onClick={props.handleNoResults}>Go home</button>
      </div>
    );
  }

  return (
    <div className={style.container}>
      {isLoading && <Spinner isLoading={isLoading} />}
      {displayedData}
      {noResults}

      {/* {redditHome.map(data => (
        <Card
          {...data}
          fetchComments={fetchingComments}
          comments={comments}
          isLoadingComments={isLoadingComments}
          permaLink={data.permalink}
          selectedPermaLink={selectedPermaLink}
        />
      ))} */}
    </div>
  );
};

export default Home;
