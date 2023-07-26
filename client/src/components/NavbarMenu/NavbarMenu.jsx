import {Link} from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode.js";
import DarkModeIcon from "@mui/icons-material/DarkMode.js";
import LogoutIcon from "@mui/icons-material/Logout.js";
import "./navbarMenu.scss";

const NavbarMenu = ({currentUser, darkMode, logout, toggle}) => {
    return (
        <div className="navbar__menu">
            <Link reloadDocument to={`/profile/${currentUser._id}`}>
                <div className="navbar__menu-profile">
                    <div className="navbar__img">
                        <img
                            src={!currentUser.profilePicture ? "../src/images/default.jpg" : currentUser.profilePicture}
                            alt="Profile picture"/>
                    </div>
                    <div className="navbar__menu-profile-name">
                        <p>{currentUser.name} {currentUser.surname}</p>
                    </div>
                </div>
            </Link>
            <ul className="navbar__menu-list">
                <li onClick={toggle}>
                    {darkMode ? (
                        <>
                            <LightModeIcon/>
                            Light mode
                        </>
                    ) : (
                        <>
                            <DarkModeIcon/>
                            Dark mode
                        </>
                    )}
                </li>
                <li onClick={logout}>
                    <LogoutIcon/>
                    Logout
                </li>
            </ul>
        </div>
    );
}

export default NavbarMenu;