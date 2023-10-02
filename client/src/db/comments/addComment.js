import {COMMENTS_URL} from "../../api/api.js";

export const addComment = async (commentData) => {
    const response = await fetch(COMMENTS_URL, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if(!response.ok) throw Error("Failed to post data");
    return await response.json();
};
