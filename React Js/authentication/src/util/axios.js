import axios from "axios";

export const rest = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

// export default rest;