import {userRegister} from "../userRegister.js";

const mockData = {
    name: "user",
    surname: "user",
    email: "user@user.com",
    password: "123456",
    confirmPassword: "123456",
}

describe("userRegister db function", () => {
    it('should return the registered user', async () => {
        const newUser = await userRegister(mockData);
        expect(newUser).toEqual({
            name: "user", surname: "user", email: "user@user.com", password: "123456", confirmPassword: "123456",
        });
    });
});