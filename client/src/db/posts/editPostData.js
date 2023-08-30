import {USER_POSTS_GET} from "../../api/api.js";

export const editPostData = async (postData, postId) => {
    try {
        const response = await fetch(`${USER_POSTS_GET}/${postId}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
