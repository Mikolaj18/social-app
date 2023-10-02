import {userLogin} from "../userLogin.js";

const mockData = {
    email: "user@user.com",
    password: "123456",
}

describe("userLogin db function", () => {
    const setUser = vi.fn();
    it('should return the logged in user', async () => {
        await userLogin(mockData, setUser);
        expect(setUser).toHaveBeenCalledTimes(1);
        expect(setUser).toHaveBeenCalledWith({email: "user@user.com", password: "123456"});
    });
});