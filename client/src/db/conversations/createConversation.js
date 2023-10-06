import {CONVERSATIONS_URL} from "../../api/api.js";

export const createConversation = async (recipientId) => {
    const response = await fetch(CONVERSATIONS_URL, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(recipientId),
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log(response)
    if(!response.ok) throw Error("Failed to post data");
    return await response.json();
};
