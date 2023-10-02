import {COMMENTS_URL} from "../../api/api.js";

export const getPostComments = async (postId) => {
    const response = await fetch(`${COMMENTS_URL}/${postId}`, {
        credentials: "include",
    });
    if(!response.ok) throw Error("Failed to get data")
    return await response.json();
}