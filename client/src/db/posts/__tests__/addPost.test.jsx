import {addPost} from "../addPost.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

const mockData = {
    description: "Post 4",
    file: "",
}

describe("addPost db function", () => {
    it('should return the posted todo item', async () => {
        const postedPost = await addPost(mockData);
        expect(postedPost).toEqual({
            author: 1, description: "Post 4", file: "",
        });
    });
    it('should fail with an error', async () => {
        server.use(
            rest.post('http://localhost:8800/posts', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await addPost(mockData);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to post data');
            }
        }
    });
});