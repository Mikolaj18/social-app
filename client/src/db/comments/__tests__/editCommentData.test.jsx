import {server} from "../../../mocks/server.js";
import {rest} from "msw";
import {editCommentData} from "../editCommentData.js";

const commentId = 5;
const postId = 2;
const mockData = {
    id: commentId,
    postId,
    description: "Comment 5",
}

describe('editCommentData db function', () => {
    it('should return the updated comment', async () => {
        const updatedComment = await editCommentData(mockData, commentId);
        expect(updatedComment).toEqual({
            id: 5,
            postId: 2,
            description: "Comment 5",
        });
    });
    it('should fail with an error', async () => {
        server.use(
            rest.put('http://localhost:8800/comments/5', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await editCommentData(mockData, commentId);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to update data');
            }
        }
    });
});