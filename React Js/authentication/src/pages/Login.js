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
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      )
      .then((response) => {
        console.log(response);
        if(response.status === SUCCESS);
          isValidUser = true
      })
      .catch((error) => {
        console.log(error.response);
      });
    return isValidUser;
  },
  getUserInfo: async () => {
    let userData, csrf;
    await rest
      .get("/ws/app/info")
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
    let isLoggedIn = await api.login(username, password, baseURL);

    if (isLoggedIn) {
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
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </label>
            <label>
              Server URL:
              <input
                type="url"
                name="baseURL"
                value={baseURL}
                onChange={handleChange}
              />
            </label>
            <input className="btn" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
