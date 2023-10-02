import {USER_LOGOUT_URL} from "../../api/api.js";

export const userLogout = async () => {
    try {
        const response = await fetch(USER_LOGOUT_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
};
