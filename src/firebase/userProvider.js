import { createContext,useState, useEffect,useContext } from "react";
import firebase from 'firebase/app';



export const UserContext = createContext();

export const UserProvider = ({children})=>{
	const [session, setSession ]= useState({user: null, loading: false,isAdmin:false});

	useEffect(()=>{
		const unsubscribe = firebase.auth().onAuthStateChanged(async (user)=>{
			let isAdmin = false;
			if(user){
				const token = await user.getIdTokenResult()
				isAdmin = token.claims.admin
			}


			setSession({user, loading:false, isAdmin});
		})
	
		return ()=> unsubscribe(); 

	},[])

	return <UserContext.Provider value={session}>
		{!session.loading && children}
	</UserContext.Provider>
}

export const useSession =()=>{
	const session = useContext(UserContext)
	return session;
}