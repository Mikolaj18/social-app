import {setupServer} from "msw/node";
import {userHandlers} from "./userHandlers.js";
import {postHandlers} from "./postHandlers.js";

export const server = setupServer(
    ...userHandlers,
    ...postHandlers
);
