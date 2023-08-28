import {USER_POSTS_GET} from "../../api/api.js";

export const deletePost = async (postId) => {
    try {
        const response = await fetch(`${USER_POSTS_GET}/${postId}`, {
            method: "DELETE",
            credentials: "include",
        });
    } catch (error) {
        console.log(error);
    }
};
