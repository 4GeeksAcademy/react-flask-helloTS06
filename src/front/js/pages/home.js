import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Signup } from "./signup";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Welcome</h1>
			<h2>{store.message}</h2>
			<div>
            {!store.token?
			<>
				<Link to="/login">
					<button className="btn btn-success">Login</button>
				</Link>
				<Link to="/signup">
					<button className="btn btn-primary">Sign Up</button>
				</Link>
				</>
			:
			<button className="btn btn-warning" onClick = {handleLogOut}>Log Out</button>
		}
			</div>
		</div>
	)}
	
	