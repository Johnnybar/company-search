import React from "react";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import Header from "./Header";

describe("Header", () => {
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
  test("renders header", () => {
    render(<Header />, container);
    const headerText = screen.getByText(/live company search/i);
    expect(headerText).toBeInTheDocument();
  });
});
