import {CONVERSATIONS_URL} from "../../api/api.js";

export const getConversations = async () => {
    const response = await fetch(CONVERSATIONS_URL, {
        credentials: "include",
    });
    if(!response.ok) throw Error("Failed to get data")
    return await response.json();
}