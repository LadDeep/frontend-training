import { useNavigate } from "react-router-dom"
import Profile from "../components/Profile";
import {CustomerCard} from '../components/CustomerCard';

const Home = (props) => {
    const navigate = useNavigate();
    const customers = props.customerData;
    
    const handleLogout = ()=>{
        props.logOut();
        navigate('/login');
    }
    
    return (
        <div className="col-2">
            <div className="content">
                <h1 className="heading">Home Page</h1>
                {
                    customers && customers.map((customer)=>
                        <CustomerCard key={customer.id} company={customer}/>
                    )
                }
            </div>
            <div className="user-profile">
                <Profile user={props.userData}/>
                <button className="btn" type="button" onClick={handleLogout}>Logout</button>      
            </div>

        </div>
    )
}

export default Home
