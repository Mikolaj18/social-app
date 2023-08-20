import {LIKES_URL} from "../../api/api.js";

export const like = async (objectId) => {
    try {
        const response = await fetch(LIKES_URL, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(objectId),
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        console.log(error);
    }
};
