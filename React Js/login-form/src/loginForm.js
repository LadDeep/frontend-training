import React from 'react';
import { useState, useCallback } from 'react';

function LoginForm(){
    const initialInputsState = "{username:'', password:'', city:'', server:'', role:'', sso:{mail:false, payroll:false, self_service:false}}"
    const initialErrorsState = "{username:'', password:''}";
    const [inputs, setInputs] = useState(initialInputsState);
    const [errors, setErrors] = useState(initialErrorsState)
    
    const handleChange = (event)=>{
        if(event.type !== 'checked'){
            const {name, value} = event.target;
            setInputs((prevState)=>({
                ...prevState,
                [name]: value
            })); 
        } else {
            const {name, checked} = event.target;
            setInputs((state)=>{
                const selectedSSO = state.sso;
                return selectedSSO[name] = checked;
            })
        }
    }


    const isPasswordValid = (inputs) => {
        return (/^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/).test(inputs);
    };

    const validate = useCallback((inputs) => {
        setErrors({});
        const errors = {};
        
        if(!inputs.username){
            errors.username = "Username is mandatory";
        }
        if(!inputs.password){
            errors.password = "Password cannot be empty";
        }
        else if(!isPasswordValid(inputs.password)){
            errors.password = "Password must have 8 characters and atleast 1 number";
        }
        return errors;
    }, []);


    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            const errors = validate(inputs);
            if (errors) {
                setErrors(errors);
                return;
            } else {
                // redirect on successful login
            }
        },
        [validate, inputs],
    )

    const handleReset = (event)=>{
        setInputs(initialInputsState);
        setErrors(initialErrorsState)
    }

    return(
        <form method="POST" onSubmit={handleSubmit}>
            <div className="form-control">
                <label>Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={inputs.username} 
                    onChange={handleChange}
                />
                <div className="error">
                    { errors.username && 
                        <i className="fa-solid fa-circle-exclamation"/>
                    }
                    <small>{errors.username}</small>
                </div>
            </div>
            <div className="form-control">
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={inputs.password} 
                    onChange={handleChange}
                />
                <div className="error">
                    { errors.password &&
                        <i className="fa-solid fa-circle-exclamation"></i>
                    }
                    <small>{errors.password}</small>
                </div>
            </div>
            <div className="form-control">
                <label>City of Employment:</label>
                <input 
                    type="text" 
                    name="city" 
                    value={inputs.city} 
                    onChange={handleChange}
                />
            </div>
            <div className="form-control">
                <label>Web server:</label>
                <select value={inputs.server} onChange={handleChange}>
                    <option value="" defaultValue hidden>-Choose a server-</option>
                    <option value="firebase-auth">Firebase Auth</option>
                    <option value="auth0">Auth0</option>
                </select>
            </div>
            <div className="form-control">
                <p>Please specify your role:</p>
                <div>
                    <input 
                        type="radio" 
                        name="role" 
                        checked={inputs.role === 'admin'} 
                        value="admin" 
                        onChange={handleChange}
                    />
                    <label>Admin</label>
                    <br/>
                    <input 
                        type="radio" 
                        name="role" 
                        checked={inputs.role === 'engineer'} 
                        value="engineer" 
                        onChange={handleChange}
                    />
                    <label>Engineer</label>
                    <br/>
                    <input 
                        type="radio" 
                        name="role" 
                        checked={inputs.role === 'manager'} 
                        value="manager" 
                        onChange={handleChange}
                    />
                    <label>Manager</label>
                    <br/>
                    <input 
                        type="radio" 
                        name="role" 
                        checked={inputs.role === 'guest'} 
                        value="guest" 
                        onChange={handleChange}
                    />
                    <label>Guest</label>
                </div>
            </div>
            <div className="form-control">
                <p>Single Sign-on to the following:</p>
                <div>
                    <input 
                        type="checkbox" 
                        name="mail" 
                        onChange={handleChange}
                    />
                    <label>Mail</label>
                    <br/>    
                    <input 
                        type="checkbox" 
                        name="payroll" 
                        onChange={handleChange}
                    />
                    <label>Payroll</label>
                    <br/>
                    <input 
                        type="checkbox" 
                        name="self_service" 
                        onChange={handleChange}
                    />
                    <label>Self-Service</label>
                </div>
            </div>
                <div className="form-control">
                <input 
                    type="submit" 
                    value="Login"
                />
                <input 
                    type="reset" 
                    value="Reset" 
                    onClick={handleReset}
                />
            </div>
        </form>
    )
    
}
export default LoginForm;