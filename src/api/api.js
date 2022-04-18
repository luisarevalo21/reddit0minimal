import { baseURL } from "../reddit/reddit";

export const redditHomeContent = fetch(`${baseURL}/r/popular/.json`);
