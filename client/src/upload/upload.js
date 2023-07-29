// import {CLOUDINARY_UPLOAD_URL} from "../api/api.js";
//
// export const upload = async (file) => {
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "social");
//     try {
//         const response = await fetch(CLOUDINARY_UPLOAD_URL, {
//             method: "POST",
//             body: data,
//         });
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//     }
// }