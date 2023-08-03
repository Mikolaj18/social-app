import {REMOVE_FRIEND_URL} from "../../api/api.js";

export const removeFriend = async (id) => {
    try {
        const response = await fetch(`${REMOVE_FRIEND_URL}/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
