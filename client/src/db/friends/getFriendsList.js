import {FRIENDS_LIST_URL} from "../../api/api.js";

export const getFriendsList = async (id) => {
    try {
        const response = await fetch(`${FRIENDS_LIST_URL}/${id}`, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}