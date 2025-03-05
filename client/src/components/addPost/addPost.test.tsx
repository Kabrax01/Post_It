import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddPost from "./AddPost";

describe("addPost", () => {
    const renderComponent = () => {
        render(<AddPost />);

        return {
            heading: screen.getByRole("heading"),
            button: screen.getByTestId("open form button"),
            form: screen.queryByTestId("form"),
            user: userEvent.setup(),
        };
    };

    it("should render heading and button", () => {
        const { heading, button } = renderComponent();

        expect(heading).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("from should not be visible on the initial render", () => {
        const { form } = renderComponent();

        expect(form).not.toBeVisible();
    });

    it("should show and hide form after user clicks the button ", async () => {
        const { form, button, user } = renderComponent();

        await user.click(button);

        expect(form).toBeVisible();

        await user.click(button);

        expect(form).not.toBeVisible();
    });

    it.each([
        {
            name: "title",
        },
        {
            name: "author",
        },
        {
            name: "content",
        },
    ])("should render $name input, and label", async ({ name }) => {
        const { button, user } = renderComponent();

        await user.click(button);

        expect(
            screen.getByPlaceholderText(new RegExp(name, "i"))
        ).toBeInTheDocument();
        expect(screen.getByText(new RegExp(name, "i"))).toBeInTheDocument();
    });
});
