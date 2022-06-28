import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERNAME = "Deep";
const PASSWORD = "Test";
const BASE_URL = "https://test.axelor.com/open-suite-master";
const SUCCESS = 200;

const Login = (props) => {
    const [{username, password}, setState] = useState({username:'', password:''});
    const navigate = useNavigate();
    const handleChange = (event)=>{
        const {name, value} = event.target;
        setState((prevState) =>({
            ...prevState,
            [name]:value
        }));
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        // if( username === USERNAME && password === PASSWORD){
        //     props.logIn();
        //     navigate('/');
        // }

        axios.post("/login.jsp", {
            username: username,
            password: password
        }, {
            baseURL: BASE_URL,
        })
        .then((response) => {
            if(response.status === SUCCESS){
                axios.get("/ws/app/info", {
                    baseURL: BASE_URL,
                    withCredentials: true
                })
                .then((response) => {
                    console.log(response.data);
                    props.logIn({
                        "id": response.data["user.id"],
                        "name": response.data["user.name"],
                        "lang": response.data["user.lang"],
                        "profileImg": BASE_URL+'/'+ response.data["user.image"],
                        "type": response.data["user.login"]
                    })
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

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
                <input 
                    className="btn"
                    type="submit"
                    value="Login" 
                />
            </form>
        </div>
    )
}

export default Login
