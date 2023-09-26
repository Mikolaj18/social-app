import {getSingleUserData} from "../getSingleUserData.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

describe('getSingleUserData db function', () => {
    it('should return the correct user data', async () => {
        const userId = 1;
        const userData = await getSingleUserData(userId);

        expect(userData).toEqual({
            id: userId,
            name: 'John',
            surname: 'Doe',
            email: 'johndoe@mail.com',
            profilePicture: '',
            coverPicture: '',
            work: 'teacher',
            from: 'London',
            livesIn:'London',
            description: 'lorem ipsum',
        });
    });

    it('should fail with an error', async () => {
        server.use(
            rest.get('http://localhost:8800/users/1', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await getSingleUserData(1);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to get data');
            }
        }
    });
});