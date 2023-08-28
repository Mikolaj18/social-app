import {USER_POSTS_EDIT} from "../../api/api.js";

export const editPostData = async (postData, id) => {
    try {
        const response = await fetch(`${USER_POSTS_EDIT}/${id}`, {
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
