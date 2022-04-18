import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubReddits = createAsyncThunk(
  "subreddit/fetchSubReddits",
  async (_, rejectWithValue) => {
    try {
      const response = await fetch("https://www.reddit.com/subreddits/.json");
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue({ title: error.messsage });
    }
  }
);

export const SubRedditSlice = createSlice({
  name: "subreddit",
  initialState: {
    defaultSubReddit: "",
    allSubReddits: [],
    selectedSubReddit: "",
    hasError: false,
    isLoading: false,
  },

  reducers: {
    setSelectedSubReddit: (state, action) => {
      state.selectedSubReddit = action.payload;
    },
  },
  extraReducers: {
    [fetchSubReddits.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },

    [fetchSubReddits.rejected]: (state, action) => {
      state.hasError = action.payload;
      state.isLoading = false;
    },
    [fetchSubReddits.fulfilled]: (state, action) => {
      state.allSubReddits = action.payload.data.children.map(subreddit => ({
        title: subreddit.data.title,
        avatar: subreddit.data.header_img,
        url: subreddit.data.url,
      }));
    },
  },
});

export const { setSelectedSubReddit } = SubRedditSlice.actions;

export const allSubReddits = state => state.subReddit.allSubReddits;
export const selectedSubReddit = state => state.subReddit.selectedSubReddit;
export default SubRedditSlice.reducer;
