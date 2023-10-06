import SearchIcon from "@mui/icons-material/Search.js";
import "./searchBar.scss";

const SearchBar = ({onSubmit, searchRef}) => {
    return (
        <form className="searchBar" onSubmit={onSubmit}>
            <input type="text" placeholder="Search for users" ref={searchRef}/>
            <button type="submit">
                <SearchIcon/>
            </button>
        </form>
    );
}

export default SearchBar;