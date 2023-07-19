import {USER_LOGIN_URL} from "../../api/api.js";

export const userLogin = async (userData, setUser) => {
    try {
        const response = await fetch(USER_LOGIN_URL, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw await response.json();
        const data = await response.json();
        setUser(data);
    } catch (error) {
        throw new Error(error);
    }
};
