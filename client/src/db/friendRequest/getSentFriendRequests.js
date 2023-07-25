import {SENT_FRIEND_REQUESTS_URL} from "../../api/api.js";

export const getSentFriendRequests = async () => {
    try {
        const response = await fetch(SENT_FRIEND_REQUESTS_URL, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}