import "./Navbar.scss";
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {Link} from "react-router-dom";
import {DarkModeContext} from "../../context/darkModeContext.jsx";

export const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    const {darkMode, toggle} = useContext(DarkModeContext);

    const [openMenu, setOpenMenu] = useState(false);

    const handleMenuOpen = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <nav className="navbar">
            <div className="navbar__wrapper">
                <Link to="/">
                    <div className="navbar__logo">
                        <h1>Social App</h1>
                    </div>
                </Link>
                <div className="navbar__items">
                    <div className="navbar__item">
                        <MessageIcon/>
                    </div>
                    <div className="navbar__item">
                        <GroupIcon/>
                    </div>
                    <div className="navbar__item navbar__img">
                        <img onClick={handleMenuOpen} src={!currentUser.profilePicture ? "../src/images/default.jpg" : currentUser.profilePicture} alt="Profile picture"/>
                    </div>
                </div>
            </div>
            {openMenu &&
                <div className="navbar__menu">
                    <div className="navbar__menu-profile">
                        <div className="navbar__img">
                            <img src={!currentUser.profilePicture ? "../src/images/default.jpg" : currentUser.profilePicture} alt="Profile picture"/>
                        </div>
                        <div className="navbar__menu-profile-name">
                            <p>{currentUser.name} {currentUser.surname}</p>
                        </div>
                    </div>
                    <ul className="navbar__menu-list">
                        <li onClick={toggle}>
                            {darkMode ? (
                                <>
                                    <LightModeIcon />
                                    Light mode
                                </>
                            ) : (
                                <>
                                    <DarkModeIcon />
                                    Dark mode
                                </>
                            )}
                        </li>
                        <li>
                            <LogoutIcon/>
                            Logout
                        </li>
                    </ul>
                </div>}
        </nav>
    );
}

export default Navbar;