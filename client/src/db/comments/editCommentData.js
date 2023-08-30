import {COMMENTS_URL} from "../../api/api.js";

export const editCommentData = async (commentData, commentId) => {
    try {
        const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
            method: "PUT",
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
