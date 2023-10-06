import {MESSAGES_URL} from "../../api/api.js";

export const sendMessage = async (messageData) => {
    const response = await fetch(MESSAGES_URL, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(messageData),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if(!response.ok) throw Error("Failed to post data");
    return await response.json();
};
