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

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //useffect fetch both subreddits and home page

  ///fetches subredit content
  useEffect(() => {
    const fetchSubreddits = async () => {
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
    };

    // const fetchHomeContent = async () => {
    //   // console.log("fetching");
    //   setIsLoading(true);
    //   const response = await fetch(`${baseURL}/r/popular/.json`);
    //   if (response) {
    //     const data = await response.json();

    //     // console.log(data.data.children);
    //     const filtereData = data.data.children.map(element => ({
    //       author: element.data.author,
    //       title: element.data.title,
    //       ups: element.data.ups,
    //       url_overridden_by_dest: element.data["url_overridden_by_dest"],
    //       created_utc: element.data["created_utc"],
    //     }));
    //     setIsLoading(false);
    //     setRedditHome(filtereData);
    //   }
    // };

    fetchHomeContent();
    fetchSubreddits();
  }, []);

  const fetchHomeContent = async () => {
    console.log("fetching");
    setFilteredHomeData(null);
    setIsLoading(true);
    const response = await fetch(`${baseURL}/r/popular/.json`);
    if (response) {
      const data = await response.json();

      console.log(data);

      console.log(data.data.children);
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
    console.log(filteredData);

    setFilteredHomeData(filteredData);
  };

  const handleClick = async url => {
    setIsLoading(true);

    setSelectedSubreddit(url);
    const response = await fetch(baseURL + url + ".json");
    const data = await response.json();

    const filteredData = data.data.children.map(element => ({
      ...element.data,
    }));

    // console.log("THE DATA IS ", filteredData);
    setIsLoading(false);
    setRedditHome(filteredData);
  };

  const fetchComments = async permaLink => {
    setIsLoadingComments(true);

    setSelectedPermaLink(permaLink);

    const response = await fetch(`https://www.reddit.com${permaLink}/.json`);
    console.log("RESPONSE IS", response);
    if (response.ok) {
      const data = await response.json();

      // console.log(data[1].data.children[0]);

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
      // console.log("comments are", comments);
      setComments(comments);
      setIsLoadingComments(false);
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
      />
      <Sidebar
        handleClick={handleClick}
        subreddits={subreddits}
        isLoading={isLoading}
        selectedSubreddit={selectedSubreddit}
      />
    </div>
  );
}

export default App;
