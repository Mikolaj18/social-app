import {COMMENTS_URL} from "../../api/api.js";

export const editCommentData = async (commentData, commentId) => {
    const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if(!response.ok) throw Error("Failed to update data")
    return await response.json();
};
