import {USER_EDIT_PROFILE_URL} from "../../api/api.js";

export const editUserProfile = async (userData, id) => {
    const response = await fetch(`${USER_EDIT_PROFILE_URL}/${id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) throw Error('Failed to update data');
    return await response.json();
};
