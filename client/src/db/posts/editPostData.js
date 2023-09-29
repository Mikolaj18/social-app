import {USER_POSTS_GET} from "../../api/api.js";

export const editPostData = async (postData, postId) => {
    const response = await fetch(`${USER_POSTS_GET}/${postId}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if(!response.ok) throw Error("Failed to update data");
    return await response.json();
};
