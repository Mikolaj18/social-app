import {USER_AND_FRIENDS_POSTS_GET} from "../../api/api.js";

export const getUserAndFriendsPosts = async () => {
    try {
        const response = await fetch(`${USER_AND_FRIENDS_POSTS_GET}`, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}