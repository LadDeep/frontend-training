import { useState, useEffect } from "react";
import { rest } from "./util/axios";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCustomerForm from "./components/AddCustomerForm";
import ModifyCustomerForm from "./components/ModifyCustomerForm";
import CustomerCardList from "./components/CustomerCardList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LinearProgress from "@mui/material/LinearProgress";

function getLoggedInUser() {
  const xcsrf = localStorage.getItem("X-CSRF Token");
  const existingUser = localStorage.getItem("UserData");

  console.log(xcsrf, existingUser);
  return xcsrf && existingUser ? existingUser : null;
}

function getLoggedInBaseURL() {
  const url = localStorage.getItem("BaseURL");

  return url ? url : null;
}

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return Navigate({ to: "/login" });
  }

  return children;
};

function App({ user, setUser, logout }) {
  const isLoggedIn = Boolean(user);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Home logOut={logout} userData={user} />
            </Protected>
          }
        >
          <Route path="add" element={<AddCustomerForm />} />
          <Route path="edit" element={<Outlet />}>
            <Route path=":id" element={<ModifyCustomerForm />} />
          </Route>
          <Route index element={<CustomerCardList />} />
        </Route>
        <Route path="/login" element={<Login onLogin={setUser} />} />
      </Routes>
    </div>
  );
}

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const setUser = (data, csrf, baseURL) => {
    console.log(data, csrf);
    setUserData(data);
    localStorage.setItem("X-CSRF Token", csrf);
    localStorage.setItem("UserData", JSON.stringify(data));
    localStorage.setItem("BaseURL", baseURL);
  };

  const logout = () => {
    setUserData(null);
    localStorage.clear("UserData");
    localStorage.clear("X-CSRF Token");
    localStorage.clear("BaseURL");
  };

  useEffect(() => {
    try {
      const user = getLoggedInUser();
      console.log(typeof user);
      user !== String(undefined) && setUserData(JSON.parse(user));

      const baseURL = getLoggedInBaseURL();
      if (baseURL) rest.defaults.baseURL = baseURL;
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <LinearProgress/>;

  return <App user={userData} setUser={setUser} logout={logout} />;
}
