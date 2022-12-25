import React, { useState,useContext } from 'react'
import { NavLink } from 'react-router-dom';
import './signup.css';
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Sign_in = () => {

    const [logdata,setData] = useState({
       email:"",
       password:"" 
    });
    console.log(logdata);

    const { account, setAccount } = useContext(LoginContext);
    
    const adddata = (e) =>{
           const {name,value} = e.target;
    
           setData(()=>{
            return{
                ...logdata,
                [name]:value
            }
           })
    };
    
    const senddata = async(e)=>{
        e.preventDefault();
    
        const { email, password } = logdata;
        // console.log(email);
        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });
    
    
            const data = await res.json();
            console.log(data);
    
            if (res.status === 400 || !data) {
                console.log("invalid details");
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                setData({ ...logdata, email: "", password: "" })
                toast.success("Login Successfully done 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log( error.message);
        }
    
    }
        return (
            
                <section>
                <div className='sign_container'>
                <div className='sign_header'>
                    <img src='data:image/jpeg;base64,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'  />
    
                </div>
                <div className='sign_form'>
                    <form method='POST'>
                        <h1>Sign-In</h1>
                        <div className='form_data'>
                            <label htmlFor='email'>Email</label>
                            <input type="email"
                            onChange={adddata}
                            value={logdata.email}
                            name='email' id='email'/>
                        </div>
                        <div className='form_data'>
                        <label htmlFor='password'>Password</label>                      
                              <input type="password" 
                            onChange={adddata}
                            value={logdata.password}
                            name='password' id='password' placeholder='At least 6 char'/>
                        </div>
                        <button type="submit" className='signin_btn' onClick={senddata}>Continue</button>
                        
                    </form>
                    </div>
                    <ToastContainer />
            
                <div className='create_accountinfo'>
                    <p>New User</p>
                 <NavLink to='/register'><button>Create Your Account</button></NavLink>
    
                </div>
                </div>
         
    </section>
        )

}

  

        

      
    

export default Sign_in