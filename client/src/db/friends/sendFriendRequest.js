import {FRIEND_REQUESTS_URL} from "../../api/api.js";

export const sendFriendRequest = async (userData) => {
        const response = await fetch(FRIEND_REQUESTS_URL, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if(!response.ok) throw Error("Failed to send request");
        return await response.json();
    };
