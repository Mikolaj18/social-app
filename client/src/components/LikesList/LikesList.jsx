import "./likesList.scss";
import CloseIcon from "@mui/icons-material/Close.js";
import {useQuery} from "@tanstack/react-query";
import {getLikes} from "../../db/likes/getLikes.js";
import Spinner from "../Spinner/Spinner.jsx";
import {Link} from "react-router-dom";

const LikesList = ({post, onClose}) => {
    const {isLoading, error, data} = useQuery({
        queryKey: [`like-${post._id}`],
        queryFn: async () => await getLikes(post._id),
    });

    return (
        <div className="modal">
            <div className="modal__content">
                <ul className="likes-list">
                    {isLoading ? <Spinner/> : error ? "Something went wrong" :
                        data.map(user => (
                            <Link reloadDocument to={`/profile/${user.user._id}`} key={user.user._id}>
                                <li>
                                    <div className="user-profile-rounded">
                                        <img
                                            src={user.user.profilePicture ? user.user.profilePicture : "../src/images/default.jpg"}
                                            alt="Profile picture"/>
                                    </div>
                                    <p>{user.user.name} {user.user.surname}</p>
                                </li>
                            </Link>
                        ))}
                </ul>
                <CloseIcon onClick={onClose}/>
            </div>
        </div>
    );
}

export default LikesList;