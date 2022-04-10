import React from "react";

import Card from "../Card/MainCards/Card";
import style from "./Home.module.css";

import Error from "../Error/Error";
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
    error,
    handleError,
  } = props;

  const fetchingComments = permaLink => {
    fetchComments(permaLink);
  };

  let displayedData = redditHome.map(data => (
    <Card
      {...data}
      key={data.permaLink}
      fetchComments={fetchingComments}
      comments={comments}
      isLoadingComments={isLoadingComments}
      permaLink={data.permaLink}
      selectedPermaLink={selectedPermaLink}
      totalComments={data.totalComments}
    />
  ));

  if (filteredHomeData) {
    displayedData = filteredHomeData.map(data => (
      <Card
        {...data}
        key={data.permaLink}
        fetchComments={fetchingComments}
        comments={comments}
        isLoadingComments={isLoadingComments}
        permaLink={data.permaLink}
        selectedPermaLink={selectedPermaLink}
        totalComments={data.totalComments}
      />
    ));
  }

  return (
    <div className={style.container}>
      {isLoading && <Spinner isLoading={isLoading} />}
      {displayedData}

      {error ? (
        <Error
          filteredHomeData={filteredHomeData}
          searchValue={searchValue}
          error={error}
          handleError={handleError}
        />
      ) : null}
    </div>
  );
};

export default Home;
