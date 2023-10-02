import {userLogout} from "../userLogout.js";
import {waitFor} from "@testing-library/react";


describe("userLogout db function", () => {
    it('should successfully logout user', async () => {
        const logout = await userLogout();
        await waitFor(() => {
            expect(logout).toEqual( { message: 'User has been logged out' })
        })
    });
});