import "./rightMenu.scss";
import {useQuery} from "@tanstack/react-query";
import {getFriendsList} from "../../db/friends/getFriendsList.js";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import Spinner from "../Spinner/Spinner.jsx";

const RightMenu = () => {
    const {currentUser} = useContext(AuthContext);

    const {isLoading, error, data} = useQuery({
        queryKey: [currentUser._id],
        queryFn: () => getFriendsList(currentUser._id),
    });

    return (
        <aside className="rightMenu">
            <div className="rightMenu__wrapper">
                <h2 className="rightMenu__title">Contacts</h2>
                <ul className="rightMenu__list">
                    {isLoading ? <Spinner/> : error ? "Something went wrong" :
                        data.map(f => (
                            <li className="rightMenu__list-item" key={f._id}>
                                <img src={f.profilePicture ? f.profilePicture : "../src/images/default.jpg"} alt="Profile picture"/>
                                <p>{f.name} {f.surname}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    );
}

export default RightMenu;