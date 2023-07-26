import {REJECT_FRIEND_REQUEST_URL} from "../../api/api.js";

export const rejectFriendRequest = async (requestId) => {
    try {
        const response = await fetch(REJECT_FRIEND_REQUEST_URL, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(requestId),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
};
