import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "./Input";
import { unmountComponentAtNode } from "react-dom";
import userEvent from "@testing-library/user-event";

const mockHandleSearch = () => {
  return;
};

describe("Input", () => {
  let container: any;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("renders input", () => {
    render(<Input handleSearch={mockHandleSearch} />, container);
    const inputPlaceholder = screen.getByTestId(/input/i);
    expect(inputPlaceholder).toBeInTheDocument();
  });

  test("Should display correct result when user enters search term", async () => {
    render(<Input handleSearch={mockHandleSearch} />, container);
    const inputElement = screen.queryByPlaceholderText(
      "Search for companies"
    ) as HTMLInputElement;
    userEvent.type(inputElement, "marq");
    userEvent.click(screen.getByTestId(/input/i));
    setTimeout(() => {
      expect(screen.getByText("Cortes")).toBeInTheDocument();
    }, 0);
  });
});
