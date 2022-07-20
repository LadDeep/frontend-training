import { rest, setBaseURL } from "../util/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SUCCESS = 200;

const api = {
  login: async (username, password, baseURL) => {
    setBaseURL(baseURL);
    let isValidUser = false;

    await rest
      .post(
        "/callback",
        { username, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      )
      .then((response) => {
        if (response.status === SUCCESS) {
          isValidUser = true;
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    return isValidUser;
  },
  getUserInfo: async () => {
    let userData, csrf;
    await rest
      .get("/ws/app/info", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": localStorage.getItem("X-CSRF Token")
        },
      })
      .then((response) => {
        csrf = response.headers["x-csrf-token"];
        userData = {
          id: response.data["user.id"],
          name: response.data["user.name"],
          lang: response.data["user.lang"],
          profileImg: `${rest.defaults.baseURL}/${response.data["user.image"]}`,
          type: response.data["user.login"],
        };
      })
      .catch((error) => {
        console.log(error);
      });
    return { userData, csrf };
  },
};

const Login = (props) => {
  const [isLoginSuccefull, setIsLoginSuccessfull] = useState();
  const [{ username, password, baseURL }, setState] = useState({
    username: "",
    password: "",
    baseURL: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isLoggedInSuccesfully = await api.login(username, password, baseURL);
    setIsLoginSuccessfull(isLoggedInSuccesfully);
    if (isLoggedInSuccesfully) {
      const { userData, csrf } = await api.getUserInfo();
      props.onLogin(userData, csrf, baseURL);
      navigate("/");
    }
  };

  return (
    <div style={{ margin: "1em auto", width: "500px" }}>
      <div className="card" style={{ textAlign: "center" }}>
        <h1 style={{ margin: "1em auto 0.5em" }}>Welcome to Axelor!</h1>
        <div>
          <h3 style={{ margin: "0 auto" }}>Sign In</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="baseURL">Server URL:</label>
              <input
                type="url"
                id="baseURL"
                name="baseURL"
                value={baseURL}
                onChange={handleChange}
              />
            </div>
            {isLoginSuccefull === false && (
              <small style={{color: "red", margin: "0.5em 0"}}>Invalid Credentials</small>
            )}
            <input className="btn" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
