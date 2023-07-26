import HomeIcon from "@mui/icons-material/Home.js";
import MovieIcon from "@mui/icons-material/Movie.js";
import FlagIcon from "@mui/icons-material/Flag.js";
import StoreIcon from "@mui/icons-material/Store.js";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ForumIcon from '@mui/icons-material/Forum';
import {useContext} from "react";
import "./sectionList.scss";
import {AuthContext} from "../../context/authContext.jsx";
import {Link} from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group.js";

const SectionList = ({dataFriends}) => {
    const {currentUser} = useContext(AuthContext);

    return (
      <>
          <ul className="sectionList">
              <li className="sectionList__item">
                  <HomeIcon/>
                  <p>Home</p>
              </li>
              <Link reloadDocument to={`/profile/${currentUser._id}`}>
                  <li className="sectionList__item">
                      <img src={!currentUser.profilePicture ? "../src/images/default.jpg" : currentUser.profilePicture}
                           alt="Profile picture"/>
                      <p>{currentUser.name} {currentUser.surname}</p>
                  </li>
              </Link>
              <li className="sectionList__item">
                  <PeopleAltIcon/>
                  <p>Friends</p>
              </li>
              <li className="sectionList__item">
                  <ForumIcon/>
                  <p>Messages</p>
              </li>
          </ul>
          <ul className="sectionList">
              <li className="sectionList__item">
                  <MovieIcon/>
                  <p>Watch</p>
              </li>
              <li className="sectionList__item">
                  <FlagIcon/>
                  <p>Pages</p>
              </li>
              <li className="sectionList__item">
                  <StoreIcon/>
                  <p>Marketplace</p>
              </li>
              <li className="sectionList__item sectionList__item--mobile">
                  <Link reloadDocument  to="/friends/requests">
                      <GroupIcon />
                      {dataFriends?.length !== 0 && typeof dataFriends !== "undefined" && (
                          <div className="navbar__counter">
                              {dataFriends?.length}
                          </div>
                      )}
                      <p>Friends invitation</p>
                  </Link>
              </li>

          </ul>
      </>
    );
}

export default SectionList;