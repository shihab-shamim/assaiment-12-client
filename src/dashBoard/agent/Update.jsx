import { useParams } from "react-router-dom";


const Update = () => {
    const params = useParams()
    console.log(params.id)
    return (
        <div> <h2>updated</h2>
            
        </div>
    );
};

export default Update;