import {getSingleUserData} from "../getSingleUserData.js";

it('should return the correct user data', async () => {
    const userId = "1";
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
