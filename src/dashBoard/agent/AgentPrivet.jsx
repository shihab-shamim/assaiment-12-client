import { Navigate, useLocation } from "react-router-dom";
import useAgent from "../../hooks/useAgent";
import useAuth from "../../hooks/useAuth";


const AgentPrivet = ({children}) => {
    const location =useLocation()

    const {user,loading}=useAuth()
    const [isAgent,isLoading] =useAgent()
    if(loading || isLoading){
        return <span className="loading loading-bars loading-lg"></span>;
    }
    if(user && isAgent){
        return children;
    }
    return <Navigate to="/" state={{from:location.pathname}}  replace />;

    
};

export default AgentPrivet;