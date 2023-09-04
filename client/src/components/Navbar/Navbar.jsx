import "./Navbar.scss";
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {createSearchParams, Link, useNavigate} from "react-router-dom";
import {DarkModeContext} from "../../context/darkModeContext.jsx";
import SectionList from "../SectionList/SectionList.jsx";
import {useQuery} from "@tanstack/react-query";
import {getFriendRequests} from "../../db/friends/getFriendRequests.js";
import NavbarMenu from "../NavbarMenu/NavbarMenu.jsx";
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
    const {currentUser, logout} = useContext(AuthContext);
    const {darkMode, toggle} = useContext(DarkModeContext);

    const [openMenu, setOpenMenu] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const searchRef = useRef();
    const navigate = useNavigate();

    const {isLoading: isLoadingFriends, error: errorFriends, data: dataFriends} = useQuery({
        queryKey: ["friends"],
        queryFn: () => getFriendRequests(),
    });

    useEffect(() => {
        openMobileMenu ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openMobileMenu]);

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchRef.current.value}`);
    }
    return (
        <nav className="navbar">
            <div className="navbar__wrapper">
                <Link to="/">
                    <div className="navbar__logo">
                        <h1>Social App</h1>
                    </div>
                </Link>
                <div className="navbar__search">
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Search for users" ref={searchRef}/>
                        <button className="navbar__search-btn" type="submit">
                            <SearchIcon/>
                        </button>
                    </form>
                </div>
                <div className="navbar__items">
                    <div className="navbar__item navbar__icon">
                        <MessageIcon/>
                    </div>
                    <div className="navbar__item navbar__icon">
                        <Link to="/friends/requests">
                            <GroupIcon/>
                            {dataFriends?.length !== 0 && typeof dataFriends !== "undefined" &&
                                <div className="navbar__counter">
                                    {dataFriends?.length}
                                </div>
                            }
                        </Link>
                    </div>
                    <div className="navbar__item navbar__img">
                        <img onClick={() => setOpenMenu(!openMenu)}
                             src={!currentUser.profilePicture ? "../src/images/default.jpg" : currentUser.profilePicture}
                             alt="Profile picture"/>
                    </div>
                    <div onClick={() => setOpenMobileMenu(!openMobileMenu)}
                         className="navbar__item navbar__mobile-menu-trigger">
                        {openMobileMenu ? <MenuOpenIcon/> : <MenuIcon/>}
                    </div>
                </div>
            </div>
            {openMenu &&
                <NavbarMenu darkMode={darkMode} currentUser={currentUser} logout={logout} toggle={toggle}/>
            }
            {openMobileMenu &&
                <div className="navbar__mobile">
                    <SectionList dataFriends={dataFriends}/>
                </div>
            }
        </nav>
    );
}

export default Navbar;