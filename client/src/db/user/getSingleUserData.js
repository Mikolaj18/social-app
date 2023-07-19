export const getSingleUserData = async (id) => {
    try {
        const response = await fetch(`http://localhost:8800/users/${id}`, {
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}