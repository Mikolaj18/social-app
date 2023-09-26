import {editUserProfile} from "../editUserProfile.js";
import {server} from "../../../mocks/server.js";
import {rest} from "msw";

const userId = 1;
const mockUser = {
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
}

describe('editUserProfile db function', () => {
    it('should return the updated user', async () => {
        const updatedUser = await editUserProfile(mockUser, userId);
        expect(updatedUser).toEqual({
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
            rest.put('http://localhost:8800/users/edit/1', (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        expect.assertions(1);
        try {
            await editUserProfile(mockUser,userId);
        } catch (error) {
            if(error instanceof Error) {
                expect(error.message).toEqual('Failed to update data');
            }
        }
    });
});