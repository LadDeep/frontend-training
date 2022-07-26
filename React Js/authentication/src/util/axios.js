import axios from "axios";

export const rest = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export const getBaseURL = () => {
  return rest.defaults.baseURL;
};

export const setBaseURL = (url) => {
  rest.defaults.baseURL = url;
};

export const setCsrf = () => {
  rest.defaults.xsrfHeaderName = "X-CSRF-Token";
  rest.defaults.xsrfCookieName = "CSRF-TOKEN"
}
