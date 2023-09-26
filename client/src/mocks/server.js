import {setupServer} from "msw/node";
import {userHandlers} from "./userHandlers.js";
export const server = setupServer(...userHandlers,);