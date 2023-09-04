import {SEARCH_URL} from "../../api/api.js";

export const getUsersByQuery = async (query) => {
    try {
        const response = await fetch(`${SEARCH_URL}/${query}`, {
            credentials: "include",
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}