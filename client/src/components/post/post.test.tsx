import { it, expect, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Post from "./Post";

const { openConfirmationModalMock } = vi.hoisted(() => ({
    openConfirmationModalMock: vi.fn(),
}));

vi.mock("../../hooks/useStoreSubscribe", () => ({
    useStoreSubscribe: (key: string) => {
        return {
            openConfirmationModal: openConfirmationModalMock,
        }[key];
    },
}));

describe("Post", () => {
    const post = {
        title: "Lorem",
        author: "Ipsum",
        content: "Dolor sit amet",
        createdAt: "12.12.12",
        _id: "12345",
        id: 12345,
    };

    const renderComponent = () => {
        render(<Post post={post} />);

        return {
            user: userEvent.setup(),
            deleteButton: screen.getByRole("button", { name: /delete/i }),
            editButton: screen.getByRole("button", { name: /edit/i }),
        };
    };

    it("should render correct post data and buttons", () => {
        const { deleteButton, editButton } = renderComponent();

        const title = screen.getByText(/lorem/i);
        const author = screen.getByText(/ipsum/i);
        const content = screen.getByText(/dolor sit amet/i);
        const date = screen.getByText(/12.12.12/i);

        expect(title).toBeInTheDocument();
        expect(author).toBeInTheDocument();
        expect(content).toBeInTheDocument();
        expect(date).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();
    });

    it("should show confirmation modal when user click delete button", async () => {
        const { user, deleteButton } = renderComponent();

        await user.click(deleteButton);

        expect(openConfirmationModalMock).toHaveBeenCalledOnce();
        expect(openConfirmationModalMock).toHaveBeenCalledWith({
            data: {
                id: 12345,
                mongoID: "12345",
            },
            type: "delete post",
        });
    });

    it.only("should show edit post form when user click edit button", async () => {
        const { user, editButton } = renderComponent();

        await user.click(editButton);

        expect(screen.getByRole("form")).toBeInTheDocument();
    });
});
