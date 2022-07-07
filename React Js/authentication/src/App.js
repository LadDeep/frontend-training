import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

const initialUserData = {
  id: "",
  name: "",
  lang: "",
  profileImg: "",
  type: "",
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(initialUserData);

  const logIn = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    console.log("Login status:",isLoggedIn);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUserData(initialUserData);
    localStorage.clear();
    console.log(isLoggedIn);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Home logOut={logOut} userData={userData} />
            </Protected>
          }
        />
        <Route path="/login" element={<Login logIn={logIn} />} />
      </Routes>
    </div>
  );
}

export default App;

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return Navigate({ to: "/login" });
  }

  return children;
};
