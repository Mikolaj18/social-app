import {setupServer} from "msw/node";
import {userHandlers} from "./handlers/userHandlers.js";
import {postHandlers} from "./handlers/postHandlers.js";
import {authHandlers} from "./handlers/authHandlers.js";
import {commentHandlers} from "./handlers/commentHandlers.js";
import {friendRequestsHandlers} from "./handlers/friendRequestsHandlers.js";

export const server = setupServer(
    ...userHandlers,
    ...postHandlers,
    ...authHandlers,
    ...commentHandlers,
    ...friendRequestsHandlers,
);
