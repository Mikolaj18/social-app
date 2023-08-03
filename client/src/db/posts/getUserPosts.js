import { USER_POSTS_GET, USER_AND_FRIENDS_POSTS_GET } from "../../api/api.js";

export const getUserPosts = async (id, includeFriends) => {
    try {
        const response = await fetch(
            includeFriends ? USER_AND_FRIENDS_POSTS_GET : `${USER_POSTS_GET}/${id}`,
            {
                credentials: "include",
            }
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
