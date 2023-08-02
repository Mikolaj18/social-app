import {USER_POSTS_GET} from "../../api/api.js";

export const getUserPosts = async (id) => {
    try {
        const response = await fetch(`${USER_POSTS_GET}/${id}`, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}