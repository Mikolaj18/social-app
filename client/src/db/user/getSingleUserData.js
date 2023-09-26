import {USER_GET_URL} from "../../api/api.js";

export const getSingleUserData = async (id) => {
    const response = await fetch(`${USER_GET_URL}/${id}`, {
        credentials: "include",
    });
    if (!response.ok) throw Error('Failed to get data');
    return await response.json();
}