import {addPost} from "../addPost.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

const mockData = {
    id: 5,
    description: "Post 4",
    file: "",
}

describe("addPost db function", () => {
    it('should return the posted post', async () => {
        const postedPost = await addPost(mockData);
        expect(postedPost).toEqual({
            id:5, author: 1, description: "Post 4", file: "",
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