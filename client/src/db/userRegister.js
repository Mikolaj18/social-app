import {USER_REGISTER_URL} from "../api/api.js";

export const userRegister = async (userData) => {
    try {
        const response = await fetch(USER_REGISTER_URL, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
};
