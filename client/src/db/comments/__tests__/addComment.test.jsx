import {addComment} from "../addComment.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

const mockData = {
    id: 5,
    description: "Comment 4",
}

describe("addComment db function", () => {
    it('should return the posted todo item', async () => {
        const postedComment = await addComment(mockData);
        expect(postedComment).toEqual({
            id:5, author: 1, description: "Comment 4", postId: 2,
        });
    });
    it('should fail with an error', async () => {
        server.use(
            rest.post('http://localhost:8800/comments', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await addComment(mockData);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to post data');
            }
        }
    });
});