import {getUserPosts} from "../getUserPosts.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

describe("getUserPosts db function", () => {
    it('should return the correct user posts', async () => {
        const userId = 1;
        const userPosts = await getUserPosts(userId, true);

        expect(userPosts).toEqual([
            {
                author: userId,
                description: "Post 1",
                file: "image.jpg",
            },
            {
                author: userId,
                description: "Post 2",
                file: "image.png",
            },
            {
                author: userId,
                description: "Post 3",
                file: "",
            },
        ]);
    });
    it('should fail with an error', async () => {
        server.use(
            rest.get('http://localhost:8800/posts', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await getUserPosts(1, true);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to get data');
            }
        }
    });
});