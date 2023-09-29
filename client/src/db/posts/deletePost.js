import {USER_POSTS_GET} from "../../api/api.js";

export const deletePost = async (postId) => {
    const response = await fetch(`${USER_POSTS_GET}/${postId}`, {
        method: "DELETE",
        credentials: "include",
    });
    if(!response.ok) throw Error("Failed to delete data");
    return await response.json();
};
