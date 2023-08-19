import {COMMENTS_URL} from "../../api/api.js";

export const getPostComments = async (postId) => {
    try {
        const response = await fetch(`${COMMENTS_URL}/${postId}`, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}