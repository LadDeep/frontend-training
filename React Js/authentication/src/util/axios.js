import axios from "axios";

export const rest = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getBaseURL = ()=>{
  return rest.defaults.baseURL;
}

export const setBaseURL = (url)=>{
  rest.defaults.baseURL = url;
}