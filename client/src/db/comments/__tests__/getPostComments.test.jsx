import {getPostComments} from "../getPostComments.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

const postId = 2;

describe("getPostComments db function", () => {
    it('should return the correct post comments', async () => {
        const userPosts = await getPostComments(postId);
        expect(userPosts).toEqual([
            {
                id: 2,
                author: 1,
                description: "Comment 1",
                postId: postId,
            },
            {
                id: 3,
                author: 1,
                description: "Comment 2",
                postId: postId,
            },
            {
                id: 4,
                author: 2,
                description: "Comment 3",
                postId: postId,
            }
        ]);
    });
    it('should fail with an error', async () => {
        server.use(
            rest.get('http://localhost:8800/comments/2', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await getPostComments(postId);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to get data');
            }
        }
    });
});