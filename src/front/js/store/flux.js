const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncSessionToken: () => {
				const token = sessionStorage.getItem("token");
				if (token && token !=="" && token !== undefined){
					setStore ({token:token})
				}
			},
			logIn: async (email,password) => {
				const options ={
					method: "POST",
					headers: {
						"Content-Type":"application/json"
					},
				body:JSON.stringify(
					{
						email:email,
						password:password
					}
				)
				}
				try {
					const response = await fetch(process.env.BACKEND_URL+"/api/token", options)
					if (response.status !==200){
						alert ("Error Response Code", response.status)
						return false;
					}
					const data = await response.json()
						console.log("accesstoken", data);
						sessionStorage.setItem("token", data.access_token);
						setStore ({token:data.access_token})
						return true;
				}
				catch (error){
					console.log("login error, please try again")
				}
			},
			logOut:() => {
				sessionStorage.removeItem("token");
				console.log("You are Logged out!")
				setStore({token:null})
			},

			addUser: async (email,password) => {
				const options ={
					method: "POST",
					headers: {
						"Content-Type":"application/json", 
					},
					body:JSON.stringify ({
						email: email,
						password: password
				})
				}
				try{
					const response = await fetch (process.env.BACKEND_URL+"api/signup",options)
					if (response.status!=200){
						alert("error response code",response.status)
						return false;
					}
					const data = await response.json()
                    console.log("from the backend",data)
					return true;			
				}
				catch(error){
					console.log("log in error")
				}
			},

			getMessage: async () => {
				const store = getStore ();
				const options ={
					headers: {
						"Authorization": "Bearer"+ store.token
					},
				}
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello",options)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
