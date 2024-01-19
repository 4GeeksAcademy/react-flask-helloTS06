import React,{useContext,useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Login = () => {
    const{store,actions}= useContext(Context);
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const Navigate = useNavigate();
    const handleLogIn = (e) => {
        e.preventDefault();
        actions.logIn(email,password);
    };
    if (store.token && store.token !=="" && store.token !== undefined){
        Navigate("/privatepage");
    }
    return (
        <>
        <div className="container">
            {(store.token && store.token !=="" && store.token !== undefined)?
            "You are logged in with token:"+ store.token
            :
            <div className="container text-center">
                <input type= "text" placeholder="email" onChange={e => setEmail(e.target.value)}value={email}/>
                <input type= "password" placeholder="password" onChange={e => setPassword(e.target.value)}value={password}/>
                <button onClick={handleLogIn}>log in</button>
            </div>
        }

        </div>
        </>
    )
} 

