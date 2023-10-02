import {COMMENTS_URL} from "../../api/api.js";

export const deleteComment = async (commentId) => {
    const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!response.ok) throw Error("Failed to delete data");
    return await response.json();
};
