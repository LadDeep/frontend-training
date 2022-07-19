import { Avatar, Box } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

const Home = (props) => {
  const navigate = useNavigate();
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);
  const handleLogout = () => {
    props.logOut();
    navigate("/login");
  };

  return (
    <>
      <Box className="sticky-nav">
        <Avatar
        sx={{ backgroundColor: "white"}}
          src={props.userData.profileImg}
          title="Profile"
          onClick={() => {
            setIsUserProfileVisible(!isUserProfileVisible);
          }}
        />
      </Box>
      <Outlet />
      {isUserProfileVisible && (
        <div className="user-profile">
          <Profile user={props.userData} />
          <button
            className="btn color-inv"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
