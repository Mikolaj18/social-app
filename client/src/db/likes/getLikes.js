import {LIKES_URL} from "../../api/api.js";

export const getLikes = async (objectId) => {
    try {
        const response = await fetch(`${LIKES_URL}/${objectId}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
