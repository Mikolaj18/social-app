import {server} from "../../../mocks/server.js";
import {rest} from "msw";
import {sendFriendRequest} from "../sendFriendRequest.js";

const receiverId = 2
const mockData = {
    receiver: receiverId,
}

describe("sendFriendRequest db function", () => {
    it('should return the correct friend request', async () => {
        const friendRequest = await sendFriendRequest(mockData);
        expect(friendRequest).toEqual({
            sender: 1, receiver: 2, status: 'pending',
        });
    });
    it('should fail with an error', async () => {
        server.use(
            rest.post('http://localhost:8800/friends', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await sendFriendRequest(mockData);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to send request');
            }
        }
    });
});