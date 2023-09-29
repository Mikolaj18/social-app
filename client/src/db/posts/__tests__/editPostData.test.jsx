import {server} from "../../../mocks/server.js";
import {rest} from "msw";
import {editPostData} from "../editPostData.js";

const postId = 2;
const mockData = {
    id: postId,
    author: 1,
    description: "Edited post",
    file: "cat.png",
}

describe('editPostData db function', () => {
    it('should return the updated post', async () => {
        const updatedPost = await editPostData(mockData, postId);
        expect(updatedPost).toEqual({
            id: postId,
            author: 1,
            description: "Edited post",
            file: "cat.png",
        });
    });
    it('should fail with an error', async () => {
        server.use(
            rest.put('http://localhost:8800/posts/2', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await editPostData(mockData,postId);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to update data');
            }
        }
    });
});