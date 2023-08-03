import {FRIEND_REQUESTS_URL} from "../../api/api.js";

export const sendFriendRequest = async (userData) => {
    try {
        const response = await fetch(FRIEND_REQUESTS_URL, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
