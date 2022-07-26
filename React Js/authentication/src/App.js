import { useState, useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCustomerForm from "./components/AddCustomerForm";
import ModifyCustomerForm from "./components/ModifyCustomerForm";
import CustomerCardList from "./components/CustomerCardList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LinearProgress from "@mui/material/LinearProgress";
import { setBaseURL, setCsrf } from "./util/axios";
import { api } from "./util/api";

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return Navigate({ to: "/login" });
  }

  return children;
};

function App({ user, loginUser, logoutUser }) {
  const isLoggedIn = Boolean(user);
  console.log(isLoggedIn, user);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Home logOut={logoutUser} userData={user} />
            </Protected>
          }
        >
          <Route path="add" element={<AddCustomerForm />} />
          <Route path="edit" element={<Outlet />}>
            <Route path=":id" element={<ModifyCustomerForm />} />
          </Route>
          <Route index element={<CustomerCardList />} />
        </Route>
        <Route path="/login" element={<Login onLogin={loginUser} />} />
      </Routes>
    </div>
  );
}

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const loginUser = (data) => {
    setUserData(data);
  };

  const logoutUser = () => {
    setUserData(null);
  };

  useEffect(() => {
    const checkUserValidity = async () => {
      setBaseURL("/axelor-office");
      setCsrf();
      const data = await api.getUserInfo();
      data && loginUser(data);
      setLoading(false);
    };
    checkUserValidity();

    return () => {};
  }, []);

  if (loading) return <LinearProgress />;

  return <App user={userData} loginUser={loginUser} logoutUser={logoutUser} />;
}
