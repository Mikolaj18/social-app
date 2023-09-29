import {deletePost} from "../deletePost.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

const postId = 2;
describe('deletePost db function', () => {

    it('should return the deleted post id', async () => {
        const deletedPost = await deletePost(postId);
        expect(deletedPost).toEqual({
            id: postId,
        });
    });
    it('should fail with an error', async () => {
        server.use(
            rest.delete('http://localhost:8800/posts/2', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await deletePost(postId);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to delete data');
            }
        }
    });
})