import {USER_EDIT_PROFILE_URL} from "../../api/api.js";

export const editUserProfile = async (userData, id) => {
    try {
        const response = await fetch(`${USER_EDIT_PROFILE_URL}/${id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
};
