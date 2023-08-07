import {USER_POSTS_GET} from "../../api/api.js";

export const addPost = async (userData, setUser) => {
    try {
        const response = await fetch(USER_POSTS_GET, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
