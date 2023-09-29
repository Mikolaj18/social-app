import {render, waitFor, screen} from "@testing-library/react";
import Register from "../Register.jsx";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

beforeEach(() => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Register/>
        </MemoryRouter>
    );
});

describe("Register form tests", async () => {
    it("should all inputs be initially empty", () => {
        const nameInput = screen.getByPlaceholderText('John');
        const surnameInput = screen.getByPlaceholderText('Doe');
        const emailInput = screen.getByPlaceholderText('johndoe@mail.com');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');

        expect(nameInput).toHaveValue("");
        expect(surnameInput).toHaveValue("");
        expect(emailInput).toHaveValue("");
        expect(passwordInput).toHaveValue("");
        expect(confirmPasswordInput).toHaveValue("");
    });
    it("should update inputs value", async () => {
        const nameInput = screen.getByPlaceholderText('John');
        const surnameInput = screen.getByPlaceholderText('Doe');
        const emailInput = screen.getByPlaceholderText('johndoe@mail.com');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');

        await act(async () => {
            await userEvent.type(nameInput, "User");
            await userEvent.type(surnameInput, "Test");
            await userEvent.type(emailInput, "user@mail.com");
            await userEvent.type(passwordInput, "123456");
            await userEvent.type(confirmPasswordInput, "123456");
        });

        await waitFor(() => {
            expect(nameInput).toHaveValue("User");
            expect(surnameInput).toHaveValue("Test");
            expect(emailInput).toHaveValue("user@mail.com");
            expect(passwordInput).toHaveValue("123456");
            expect(confirmPasswordInput).toHaveValue("123456");
        });
    });
    it("should display error messages to all inputs", async () => {
        const signInButton = screen.getByText('Sign in');
        act(() => {
            userEvent.click(signInButton);
        });
        const errorMessage = await screen.findAllByText(/Cannot be empty/i);
        await waitFor(() => {
            expect(errorMessage).toHaveLength(5);
        });
    });
    it("should display name error when value is too short", async () => {
        const nameInput = screen.getByPlaceholderText('John');
        const signInButton = screen.getByText('Sign in');
        await act(async () => {
            await userEvent.type(nameInput, 'ab');
            await userEvent.click(signInButton);
        });
        const errorMessage = await screen.findByText(/Name must be at least 3 characters long/i);
        await waitFor(() => {
            expect(errorMessage).toBeInTheDocument();
        });
    });
    it("should display password error when value is too short", async () => {
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const signInButton = screen.getByText('Sign in');
        await act(async () => {
            await userEvent.type(passwordInput, '123');
            await userEvent.click(signInButton);
        });
        const errorMessage = await screen.findByText(/Password must be at least 5 characters long/i);
        await waitFor(() => {
            expect(errorMessage).toBeInTheDocument();
        });
    });
    it("should display email error when email is not valid", async () => {
        const emailInput = screen.getByPlaceholderText('johndoe@mail.com');
        const signInButton = screen.getByText('Sign in');
        await act(async () => {
            await userEvent.type(emailInput, 'asbdasbadsba');
            await userEvent.click(signInButton);
        });
        const errorMessage = await screen.findByText(/Enter a valid email/i);
        await waitFor(() => {
            expect(errorMessage).toBeInTheDocument();
        });
    });
    it("should display error when password are not the same", async () => {
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
        const signInButton = screen.getByText('Sign in');

        await act(async () => {
            await userEvent.type(passwordInput, "123456");
            await userEvent.type(confirmPasswordInput, "123456789");
            await userEvent.click(signInButton);
        });
        const errorMessage = await screen.findByText(/Passwords must match/i);
        await waitFor(() => {
            expect(errorMessage).toBeInTheDocument();
        });
    });
});