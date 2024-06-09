import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
export const AuthContext=createContext(null)
const provider = new GoogleAuthProvider();
const auth =getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    
    const createUser = (email,password)=>{
        setLoading(true)
        return  createUserWithEmailAndPassword(auth,email,password)
    }
    const createGoogle =() =>{
        setUser(true)
        return signInWithPopup(auth,provider)
    }
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const signInUser = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            if(currentUser){
                setLoading(false)
            }
        })
        return () => {
            return unSubscribe()
        }
    },[])
    const updateUser =(name,photo) =>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        })
    }


    const authInfo = {
        user,
        createUser,
        createGoogle,
        logOut,
        updateUser,
        signInUser,
        loading


    }

    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;