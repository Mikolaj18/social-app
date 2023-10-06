import {MESSAGES_URL} from "../../api/api.js";

export const getMessages = async (userId) => {
    const response = await fetch(`${MESSAGES_URL}/${userId}`, {
        credentials: "include",
    });
    if(!response.ok) throw Error("Failed to get data")
    return await response.json();
}