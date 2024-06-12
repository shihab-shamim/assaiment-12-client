import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext=createContext(null)
const provider = new GoogleAuthProvider();
const auth =getAuth(app)

const AuthProvider = ({children}) => {
    const axiosPublic =useAxiosPublic()
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
        setLoading(true)
        const unSubscribe=onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            if(currentUser){
                // get token
                const userInfo={email:currentUser.email}
                // console.log(userInfo)
                axiosPublic.post('/jwt',userInfo)  
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                      setLoading(false)
                        
                    }
                })
                setLoading(false)
                
            }
            else{
                localStorage.removeItem('access-token')
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
        loading,
        logOut,


    }

    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;