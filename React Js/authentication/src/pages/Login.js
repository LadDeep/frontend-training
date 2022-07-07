import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SUCCESS = 200;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/login.jsp",
        {
          username: username,
          password: password,
        },
        {
          baseURL: baseURL,
        }
      )
      .then((response) => {
        if (response.status === SUCCESS) {
          axios
            .get("/ws/app/info", {
              baseURL: baseURL,
              withCredentials: true,
            })
            .then((response) => {
              const csrf = response.headers["x-csrf-token"];
              localStorage.setItem("X-CSRF Token", csrf);
              const userData = {
                id: response.data["user.id"],
                name: response.data["user.name"],
                lang: response.data["user.lang"],
                profileImg: baseURL + "/" + response.data["user.image"],
                type: response.data["user.login"],
              };
              props.logIn(userData, baseURL);
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
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
  );
};

export default Login;
