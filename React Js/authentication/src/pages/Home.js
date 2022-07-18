import { Outlet, useNavigate } from "react-router-dom"
import Profile from "../components/Profile";

const Home = (props) => {
    const navigate = useNavigate();

    const handleLogout = ()=>{
        props.logOut();
        navigate('/login');
    }

    return (
        <div className="col-2">
            <div className="content">
                <Outlet />
            </div>
            <div className="user-profile">
                <Profile user={props.userData}/>
                <button className="btn color-inv" type="button" onClick={handleLogout}>Logout</button>      
            </div>

        </div>
    )
}

export default Home
