export const USER_LOGIN_URL = `${import.meta.env.VITE_API_URL}/auth/login`;
export const USER_REGISTER_URL = `${import.meta.env.VITE_API_URL}/auth/register`;
export const USER_LOGOUT_URL = `${import.meta.env.VITE_API_URL}/auth/logout`;

export const USER_GET_URL = `${import.meta.env.VITE_API_URL}/users`;
export const USER_RANDOM_GET_URL = `${import.meta.env.VITE_API_URL}/users/random`;
export const USER_EDIT_PROFILE_URL = `${import.meta.env.VITE_API_URL}/users/edit`;

export const SENT_FRIEND_REQUESTS_URL = `${import.meta.env.VITE_API_URL}/friends/sent`;
export const ACCEPT_FRIEND_REQUEST_URL = `${import.meta.env.VITE_API_URL}/friends/accept`;
export const REJECT_FRIEND_REQUEST_URL = `${import.meta.env.VITE_API_URL}/friends/reject`;
export const REMOVE_FRIEND_URL = `${import.meta.env.VITE_API_URL}/friends/remove`;

export const FRIEND_REQUESTS_URL = `${import.meta.env.VITE_API_URL}/friends`;
export const FRIENDS_LIST_URL = `${import.meta.env.VITE_API_URL}/friends/list`;

export const USER_POSTS_GET = `${import.meta.env.VITE_API_URL}/posts`;

export const COMMENTS_URL = `${import.meta.env.VITE_API_URL}/comments`;

export const LIKES_URL = `${import.meta.env.VITE_API_URL}/likes`;

export const SEARCH_URL = `${import.meta.env.VITE_API_URL}/users/search`;
export const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY;
