import {USER_RANDOM_GET_URL} from "../../api/api.js";

export const getRandomUsers = async () => {
    try {
        const response = await fetch(USER_RANDOM_GET_URL, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}