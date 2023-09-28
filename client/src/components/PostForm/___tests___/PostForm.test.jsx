import {render, screen, waitFor} from "@testing-library/react";
import PostForm from "../PostForm.jsx";
import TestContextProvider from "../../../context/TestContextProvider.jsx";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

beforeEach(() => {
    render(
        <TestContextProvider>
            <PostForm/>
        </TestContextProvider>
    );
});

describe("PostForm component", () => {
    it("should render PostForm component", async () => {
        const descriptionInput = screen.getByPlaceholderText(/What's on your mind John?/i);
        const shareButton = screen.getByText(/Share/i);
        expect(descriptionInput).toBeInTheDocument();
        expect(shareButton).toBeInTheDocument();
    });
    it("should input value be initially empty", async () => {
        const descriptionInput = screen.getByPlaceholderText(/What's on your mind John?/i);
        expect(descriptionInput).toHaveValue("");
    });
    it("should file input be initially empty", async () => {
        const fileInput = screen.getByLabelText('Photo/video');
        expect(fileInput).toHaveValue("");
    });
    it("should submit button be initially disabled", () => {
        const shareButton = screen.getByText(/Share/i);
        expect(shareButton).toBeDisabled();
    });
    it("should correctly update input value", async () => {
        const descriptionInput = screen.getByPlaceholderText(/What's on your mind John?/i);
        act(() => {
            userEvent.type(descriptionInput, "Today was a good day.");
        });
        await waitFor(() => {
            expect(descriptionInput).toHaveValue("Today was a good day.");
        });
    });
    it("should submit button not to be disabled when description input is not empty", async () => {
        const descriptionInput = screen.getByPlaceholderText(/What's on your mind John?/i);
        const shareButton = screen.getByText(/Share/i);
        act(() => {
            userEvent.type(descriptionInput, "Today was a good day.");
        });
        await waitFor(() => {
            expect(shareButton).not.toBeDisabled();
        })
    });
});
