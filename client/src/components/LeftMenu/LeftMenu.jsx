import "./leftMenu.scss";
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import FlagIcon from '@mui/icons-material/Flag';
import StoreIcon from '@mui/icons-material/Store';
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";

export const LeftMenu = () => {
    const {currentUser} = useContext(AuthContext);

    return (
        <aside className="leftMenu">
            <div className="leftMenu__wrapper">
                <ul className="leftMenu__list">
                    <li className="leftMenu__list-item">
                        <HomeIcon/>
                        <p>Home</p>
                    </li>
                    <li className="leftMenu__list-item">
                        <img src={!currentUser.profilePicture ? "../src/images/default.jpg" : currentUser.profilePicture} alt="Profile picture"/>
                        <p>{currentUser.name} {currentUser.surname}</p>
                    </li>
                </ul>
                <ul className="leftMenu__list">
                    <li className="leftMenu__list-item">
                        <MovieIcon/>
                        <p>Watch</p>
                    </li>
                    <li className="leftMenu__list-item">
                        <FlagIcon/>
                        <p>Pages</p>
                    </li>
                    <li className="leftMenu__list-item">
                        <StoreIcon/>
                        <p>Marketplace</p>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default LeftMenu;