import { Outlet, useNavigate } from "react-router-dom"
import Profile from "../components/Profile";
import { getBaseURL } from "../util/axios";
import CustomerCardList from "../components/CustomerCardList";
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
                <button className="btn" type="button" onClick={handleLogout}>Logout</button>      
            </div>

        </div>
    )
}

export default Home
