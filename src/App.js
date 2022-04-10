import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import { baseURL } from "./reddit/reddit";
import React, { useEffect, useState } from "react";
import moment from "moment";

function App() {
  const [redditHome, setRedditHome] = useState([]);
  const [filteredHomeData, setFilteredHomeData] = useState(null);
  const [subreddits, setSubreddits] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPermaLink, setSelectedPermaLink] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [selectedSubreddit, setSelectedSubreddit] = useState("");

  const [error, setError] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //useffect fetch both subreddits and home page

  ///fetches subredit content
  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await fetch(baseURL + "/subreddits/.json");
        setIsLoading(true);
        const data = await response.json();

        const subreddits = data.data.children.map(subreddit => ({
          title: subreddit.data.title,
          avatar: subreddit.data.header_img,
          url: subreddit.data.url,
        }));

        setIsLoading(false);
        setSubreddits(subreddits);
      } catch (error) {
        setIsLoading(false);
        setRedditHome([]);
        setError({ title: error.message });
      }
    };
    fetchHomeContent();
    fetchSubreddits();
  }, []);

  const fetchHomeContent = async () => {
    setFilteredHomeData(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/r/popular/.json`);
      if (response.ok) {
        const data = await response.json();

        const filtereData = data.data.children.map(element => ({
          author: element.data.author,
          title: element.data.title,
          ups: element.data.ups,
          url_overridden_by_dest: element.data["url_overridden_by_dest"],
          created_utc: element.data["created_utc"],
          permaLink: element.data.permalink,
          totalComments: element.data["num_comments"],
        }));
        setIsLoading(false);
        setRedditHome(filtereData);
      }
    } catch (error) {
      setIsLoading(false);
      setRedditHome([]);
      setError({ title: error.message });
    }
  };

  const handleError = () => {
    fetchHomeContent();
  };
  const handleSearchValue = searchValue => {
    setSearchValue(searchValue);
  };

  const handleSearch = event => {
    event.preventDefault();

    if (searchValue === "") {
      fetchHomeContent();
      setFilteredHomeData(null);
      return;
    }
    const filteredData = redditHome.filter(post =>
      post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );

    if (filteredData.length === 0) {
      setError({ title: `No posts matching "${searchValue}"` });
    }
    setFilteredHomeData(filteredData);
  };

  const handleClick = async url => {
    setIsLoading(true);
    setSelectedSubreddit(url);
    setRedditHome([]);

    try {
      const response = await fetch(baseURL + url + ".json");
      const data = await response.json();

      const filteredData = data.data.children.map(element => ({
        author: element.data.author,
        title: element.data.title,
        ups: element.data.ups,
        url_overridden_by_dest: element.data["url_overridden_by_dest"],
        created_utc: element.data["created_utc"],
        permaLink: element.data.permalink,
        totalComments: element.data["num_comments"],
      }));
      setIsLoading(false);
      setRedditHome(filteredData);
    } catch (error) {
      setIsLoading(false);
      setRedditHome([]);
      setError(error);
    }
  };

  const fetchComments = async permaLink => {
    setIsLoadingComments(true);

    setSelectedPermaLink(permaLink);

    try {
      const response = await fetch(`https://www.reddit.com${permaLink}/.json`);

      if (response.ok) {
        const data = await response.json();

        const comments = data[1].data.children.map(comment => ({
          author: comment.data.author,
          text: comment.data.body,
          timestamp: moment.unix(comment.data.created_utc).fromNow(),
        }));

        comments.permaLink = permaLink;
        // const comments = data[1].children.map(comment => ({
        //   author: comment.data.author,
        //   // text: comment.data.body,
        //   // timestamp: moment.unix(comment.created_utc).fromNow(),
        // }));

        setComments(comments);
        setIsLoadingComments(false);
      }
    } catch (error) {
      setIsLoadingComments(false);

      setRedditHome([]);
      setError(error);
    }
  };

  return (
    <div className="App">
      <Navbar
        searchValue={searchValue}
        handleChange={handleSearchValue}
        handleSearch={handleSearch}
      />

      <Home
        redditHome={redditHome}
        filteredHomeData={filteredHomeData}
        isLoading={isLoading}
        comments={comments}
        fetchComments={fetchComments}
        isLoadingComments={isLoadingComments}
        selectedPermaLink={selectedPermaLink}
        searchValue={searchValue}
        handleNoResults={fetchHomeContent}
        error={error}
        handleError={handleError}
      />
      <Sidebar
        error={error}
        handleError={handleError}
        handleClick={handleClick}
        subreddits={subreddits}
        isLoading={isLoading}
        selectedSubreddit={selectedSubreddit}
      />
    </div>
  );
}

export default App;
