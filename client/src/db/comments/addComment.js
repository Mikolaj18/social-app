import {COMMENTS_URL} from "../../api/api.js";

export const addComment = async (commentData) => {
    try {
        const response = await fetch(COMMENTS_URL, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};