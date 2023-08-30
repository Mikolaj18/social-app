import {COMMENTS_URL} from "../../api/api.js";

export const deleteComment = async (commentId) => {
    try {
        const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
            method: "DELETE",
            credentials: "include",
        });
    } catch (error) {
        console.log(error);
    }
};
