import {server} from "../../../mocks/server.js";
import {rest} from "msw";
import {deleteComment} from "../deleteComment.js";

const commentId = 5;
describe('deleteComment db function', () => {
    it('should return the deleted comment id', async () => {
        const deletedComment = await deleteComment(commentId);
        expect(deletedComment).toEqual({
            id: 5,
        });
    });
    it('should fail with an error', async () => {
        server.use(
            rest.delete('http://localhost:8800/comments/5', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await deleteComment(commentId);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to delete data');
            }
        }
    });
})