import {USER_POSTS_GET} from "../../api/api.js";

export const addPost = async (userData) => {
    const response = await fetch(USER_POSTS_GET, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) throw Error('Failed to post data');
    return await response.json();
};
