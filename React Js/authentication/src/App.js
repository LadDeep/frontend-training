import React, { useState } from "react";
import { rest } from "./util/axios";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCustomerForm from "./components/AddCustomerForm";
import ModifyCustomerForm from "./components/ModifyCustomerForm";
import CustomerCardList from "./components/CustomerCardList";

import Home from "./pages/Home";
import Login from "./pages/Login";

function getLoggedInUser() {
  const xcsrf = localStorage.getItem("X-CSRF Token");
  const existingUser = localStorage.getItem("UserData");

  console.log(xcsrf, existingUser);
  return xcsrf && existingUser ? existingUser : null;
}


function getBaseURL(){
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
          <Route path="edit" element={<Outlet/>}>
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

  React.useState(() => {
    try {
      const user = getLoggedInUser();
      setUserData(JSON.parse(user));
      
      const baseURL = getBaseURL();
      if(baseURL)
        rest.defaults.baseURL = baseURL
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return <App user={userData} setUser={setUser} logout={logout} />;
}

// import React from 'react'

// export const FileUpload = () => {
//   const [data, setData] = useState();

//   const handleSubmit = () => {
//     axios
//       .post(
//         "https://sos.axelor.com/axelor-office/ws/rest/com.axelor.meta.db.MetaFile/92/content/upload?image=true&v=0&parentId=92&parentModel=com.axelor.meta.db.MetaFile",
//         data,
//         {
//           username: "admin",
//           password: "admin",
//         },
//         {
//           headers: { "content-type": "multipart/form-data" },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   console.log(data);
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="file"
//         name="image"
//         accept=".png"
//         label="Upload"
//         onChange={(e) => {
//           setData(e.target.value);
//         }}
//       />
//       <input type="submit" value="Submit"></input>
//     </form>
//   );
// };
