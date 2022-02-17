import React from "react";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import SearchResult from "./SearchResult";

const mockSearchResult = {
  city: "Nesterovskaya",
  company_name: "Bailey, Nienow and Koss",
  logo: "http://dummyimage.com/241x100.png/cc0000/ffffff",
  specialty: "Plumbing",
};

describe("Search Result", () => {
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
  test("renders search result with provided mock input", () => {
    render(<SearchResult searchResult={mockSearchResult} i={7} />);
    const searchResultText = screen.getByText(/Bailey/i);
    expect(searchResultText).toBeInTheDocument();
  });
});
