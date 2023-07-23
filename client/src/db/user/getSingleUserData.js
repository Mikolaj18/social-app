import {USER_GET_URL} from "../../api/api.js";

export const getSingleUserData = async (id) => {
    try {
        const response = await fetch(`${USER_GET_URL}/${id}`, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}