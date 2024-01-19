import React,{useContext,useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Signup = () => {
       const {store,actions}=useContext(Context);
       const [email,setEmail]=useState("");
       const [password,setPassword]=useState("");
       const [error,setError]= useState();
       const Navigate=useNavigate();
       function submitRequest(){
        actions.addUser(email,password);
       }
       useEffect(()=>{
        if (store.message != null && store.message !=""){
            setError(store.message)
        }
       },[store.message])
       return (
          <div className="text-center">
            <h1>Sign up</h1>
            <div>
                <input 
                type="email"
                className="controlled-input"
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="email"
                />
                <input
                type="password"
                className="controlled-input"
                id="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="password"
                />
            </div>
            <Link to ="/logIn">
                <button onClick={submitRequest}>Submit</button>
            </Link>
            <div>
                {error!= null && error}
                {error!= null && <Link to ="/logIn">Log in</Link>}
            </div>
          </div>
       ) 
} 