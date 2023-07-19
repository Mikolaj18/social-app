import "./userProfile.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getSingleUserData} from "../../db/user/getSingleUserData.js";
import Spinner from "../../components/Spinner/Spinner.jsx";

const UserProfile = () => {
    const {id} = useParams();

    const {isLoading, error, data} = useQuery({
        queryKey: ["profile"],
        queryFn: () => getSingleUserData(id)
    });

    console.log(data);
    return (
        <section className="profile">
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                <h1>{data.surname}</h1>
            }
        </section>
    )
}

export default UserProfile;