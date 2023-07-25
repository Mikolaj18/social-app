import {FRIEND_REQUESTS_URL} from "../../api/api.js";

export const getFriendRequests = async () => {
    try {
        const response = await fetch(FRIEND_REQUESTS_URL, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}