import {ACCEPT_FRIEND_REQUEST_URL} from "../../api/api.js";

export const acceptFriendRequest = async (requestId) => {
    try {
        const response = await fetch(ACCEPT_FRIEND_REQUEST_URL, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(requestId),
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error)
    }
};
