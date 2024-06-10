import useAdmin from "../../hooks/useAdmin";
import useRole from "../../hooks/useRole";


const Admin = () => {
    const [userStatus,role] =useRole()
    // console.log(userStatus,role)
    const isAdmin = useAdmin()
    console.log(isAdmin)
    return (
        <div><h2>This is Admin profile {role}</h2>
        </div>
    );
};

export default Admin;