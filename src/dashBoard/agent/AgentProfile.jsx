import useAgent from "../../hooks/useAgent";
import useRole from "../../hooks/useRole";


const AgentProfile = () => {
    const [isAgent,isLoading]=useAgent()
    const [userStatus, role]=useRole()
    console.log(isAgent,isLoading)
    return (
        <div>
            <h2>This is Agent Profile</h2>
            
        </div>
    );
};

export default AgentProfile;