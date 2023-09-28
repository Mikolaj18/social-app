import {USER_POSTS_GET} from "../../api/api.js";

export const getUserPosts = async (id, includeFriends) => {
    const response = await fetch(
        includeFriends ? USER_POSTS_GET : `${USER_POSTS_GET}/${id}`,
        {
            credentials: "include",
        }
    );
    if (!response.ok) throw Error('Failed to get data');
    return await response.json();
};
