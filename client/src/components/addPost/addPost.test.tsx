import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import AddPost from "./AddPost";

describe("addPost", () => {
    const renderComponent = () => {
        render(<AddPost />);

        return {
            heading: screen.getByRole("heading"),
        };
    };

    it("should render heading", () => {
        const { heading } = renderComponent();

        expect(heading).toBeInTheDocument();
    });
});
