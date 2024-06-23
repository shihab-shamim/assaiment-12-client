import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  
  const { data: users, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get('/users');
        return data;
      } catch (error) {
        console.log('users loaded data', error);
      }
    },
    initialData: []
  });

  const handleMake = async (make, id, email) => {
    if (make === 'fraud') {
      console.log(make, email);
    }
    Swal.fire({
      title: "Are you sure?",
      text: `Make a ${make}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const info = { role: make };
        console.log(info, id);
        const res = await axiosSecure.patch(`/users/${id}`, info);
        refetch();


        Swal.fire({
          title: "Updated",
          text: `${make} success`,
          icon: "success"
        });
        try{
          const {data}=await axiosSecure.delete(`/fraudDelete/${email}`)
          console.log(data,'Deleted fraud all propeerty')

        }
        catch{

        }
      }
    });

  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Delete it !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${id}`);
        console.log(res.data);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-center text-xl bg-gray-800 text-white p-2">This is manage user </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Make Admin</th>
                <th>Make Agent</th>
                <th>Make Fraud</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td><button onClick={() => handleMake('admin', user._id, user.email)} className="btn btn-ghost bg-orange-400 btn-xs">Admin</button></td>
                  <td><button onClick={() => handleMake('agent', user._id, user.email)} className="btn btn-ghost btn-xs bg-orange-500">Agent</button></td>
                  <td><button onClick={() => handleMake('fraud', user._id, user.email)} className="btn btn-ghost btn-xs bg-orange-500">Fraud</button></td>
                  <td><button onClick={() => handleDelete(user._id)} className="btn btn-ghost btn-xs bg-orange-500">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
