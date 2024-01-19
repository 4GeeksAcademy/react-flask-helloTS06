import react,{useContext,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Prvtpg = () => {
    const {store,actions}=useContext(Context);
    const Navigate=useNavigate();
    useEffect(()=>{
        if (store.token && store.token !== "" && store.token !== undefined?
        Navigate("/privatepage")
        :
        Navigate("/logIn"));

    }, [store.token]);
    return(
        <div className="text-center">Welcome!</div>
    )
} 