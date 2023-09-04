import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUsersByQuery} from "../../db/user/getUsersByQuery.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import Friend from "../../components/Friend/Friend.jsx";
import "./searchedUsers.scss";

const SearchedUsers = () => {
    const query = useLocation().search;
    const {isLoading, error, data} = useQuery({
        queryKey: [`search-${query}`],
        queryFn: () => getUsersByQuery(query),
    });

    console.log(data);
    if(data?.length === 0) return <h1 className="header">No results</h1>
    return (
        <section className="searchedUsers">
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                <>
                    <div className="friends">
                        {data.map(f => (
                            <Friend key={f._id} item={f} isSender={false} isRequest={false}/>
                        ))}
                    </div>
                </>
            }
        </section>
    );
}

export default SearchedUsers;