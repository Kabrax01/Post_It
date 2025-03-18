import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Post from "./Post";
import { Post as PostType } from "../../entities/types";

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
    const post: PostType = {
        title: "Lorem",
        author: "Ipsum",
        content: "Dolor sit amet",
        createdAt: "12.12.12",
        _id: "12345",
        id: 12345,
    };

    const renderComponent = (post: PostType) => {
        render(<Post post={post} />);

        return {
            user: userEvent.setup(),
            deleteButton: screen.getByRole("button", { name: /delete/i }),
            editButton: screen.getByRole("button", { name: /edit/i }),
        };
    };

    it("should render correct post data and buttons", () => {
        const { deleteButton, editButton } = renderComponent(post);

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
        const { user, deleteButton } = renderComponent(post);

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

    it("should show edit post form when user click edit button", async () => {
        const { user, editButton } = renderComponent(post);

        await user.click(editButton);

        expect(screen.getByRole("form")).toBeInTheDocument();
    });

    it("should truncate post content when it is longer than 200 chars", () => {
        const postWithLongString = { ...post, content: "a".repeat(220) };

        renderComponent(postWithLongString);

        const content = screen.getByText(/aaa/i);

        expect(content.textContent).toHaveLength(200 + 6);
    });

    it("should render show more button when post content is longer than 200 chars", () => {
        const postWithLongString = { ...post, content: "a".repeat(220) };

        renderComponent(postWithLongString);

        expect(
            screen.getByRole("button", { name: /show more/i })
        ).toBeInTheDocument();
    });

    it("should render show less button when user expands post content", async () => {
        const postWithLongString = { ...post, content: "a".repeat(220) };

        const { user } = renderComponent(postWithLongString);

        const expandButton = screen.getByRole("button", { name: /show more/i });
        await user.click(expandButton);

        expect(
            screen.getByRole("button", { name: /show less/i })
        ).toBeInTheDocument();
    });
});
