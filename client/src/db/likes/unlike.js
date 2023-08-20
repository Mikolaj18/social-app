import {LIKES_URL} from "../../api/api.js";

export const unlike = async (objectId) => {
    try {
        const response = await fetch(`${LIKES_URL}/${objectId}`, {
            method: "DELETE",
            credentials: "include",
        });
    } catch (error) {
        console.log(error);
    }
};
