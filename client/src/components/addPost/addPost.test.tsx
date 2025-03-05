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
            openFormButton: screen.getByTestId("open form button"),
            form: screen.queryByTestId("form"),
            submitButton: screen.getByRole("button", {
                name: /post it !/i,
            }),
            user: userEvent.setup(),
        };
    };

    it("should render heading and button", () => {
        const { heading, openFormButton } = renderComponent();

        expect(heading).toBeInTheDocument();
        expect(openFormButton).toBeInTheDocument();
    });

    it("from should not be visible on the initial render", () => {
        const { form } = renderComponent();

        expect(form).not.toBeVisible();
    });

    it("should show and hide form after user clicks the openFormButton ", async () => {
        const { form, openFormButton, user } = renderComponent();

        await user.click(openFormButton);

        expect(form).toBeVisible();

        await user.click(openFormButton);

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
        const { openFormButton, user } = renderComponent();

        await user.click(openFormButton);

        expect(
            screen.getByPlaceholderText(new RegExp(name, "i"))
        ).toBeInTheDocument();
        expect(screen.getByText(new RegExp(name, "i"))).toBeInTheDocument();
    });

    it.each([
        {
            error: "required",
            case: "is empty",
            inputValue: "empty",
        },
        {
            error: "too short",
            case: "have less than 3 characters",
            inputValue: "ab",
        },
    ])(
        "should show error message when title input $case",
        async ({ error, inputValue }) => {
            const { openFormButton, user } = renderComponent();

            await user.click(openFormButton);
            const input = screen.getByLabelText(/title/i);

            if (inputValue === "empty") {
                await user.type(input, inputValue);
                await user.clear(input);
            } else {
                await user.type(input, inputValue);
            }

            expect(
                screen.getByText(new RegExp(error, "i"))
            ).toBeInTheDocument();
        }
    );

    it.each([
        { name: "title", label: /title/i },
        { name: "author", label: /author/i },
        { name: "content", label: /content/i },
    ])(
        "should show error message when $name input is empty or too short",
        async ({ label }) => {
            const { openFormButton, user } = renderComponent();

            await user.click(openFormButton);
            const input = screen.getByLabelText(label);

            for (const { error, inputValue } of [
                { error: "required", inputValue: "empty" },
                { error: "too short", inputValue: "ab" },
            ]) {
                if (inputValue === "empty") {
                    await user.type(input, inputValue);
                    await user.clear(input);
                } else {
                    await user.type(input, inputValue);
                }

                expect(
                    screen.getByText(new RegExp(error, "i"))
                ).toBeInTheDocument();
            }
        }
    );

    it("should show error message on all inputs when user clicks submit button and inputs are empty", async () => {
        const { openFormButton, user, submitButton } = renderComponent();

        await user.click(openFormButton);
        await user.click(submitButton);

        expect(screen.getAllByText(/required/i)).toHaveLength(3);
    });
});
