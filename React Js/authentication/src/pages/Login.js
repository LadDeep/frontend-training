import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../util/api";

const Login = (props) => {
  const [isLoginSuccefull, setIsLoginSuccessfull] = useState();
  const [{ username, password }, setState] = useState({
    username: "",
    password: "",
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
    const isSuccessfullLogin = await api.login(username, password);

    if (isSuccessfullLogin) {
      setIsLoginSuccessfull(true);
      const userData = await api.getUserInfo();
      props.onLogin(userData);
      navigate("/");
    } else {
      setIsLoginSuccessfull(false);
    }
  };

  return (
    <div style={{ margin: "1em auto", width: "500px" }}>
      <div className="card" style={{ textAlign: "center" }}>
        <h1 style={{ margin: "1em auto 0.5em" }}>Welcome to Axelor!</h1>
        <div>
          <h3>Sign In</h3>
          {isLoginSuccefull === false && (
            <small style={{ color: "red", margin: "0.5em 0" }}>
              Invalid Credentials
            </small>
          )}
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
            <input className="btn" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
