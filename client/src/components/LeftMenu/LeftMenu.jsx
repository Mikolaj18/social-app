import "./leftMenu.scss";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import SectionList from "../SectionList/SectionList.jsx";

const LeftMenu = () => {

    return (
        <aside className="leftMenu">
            <div className="leftMenu__wrapper">
               <SectionList/>
            </div>
        </aside>
    );
}

export default LeftMenu;