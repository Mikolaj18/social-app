import {setupServer} from "msw/node";
import {userHandlers} from "./handlers/userHandlers.js";
import {postHandlers} from "./handlers/postHandlers.js";
import {authHandlers} from "./handlers/authHandlers.js";
import {commentHandlers} from "./handlers/commentHandlers.js";

export const server = setupServer(
    ...userHandlers,
    ...postHandlers,
    ...authHandlers,
    ...commentHandlers,
);
