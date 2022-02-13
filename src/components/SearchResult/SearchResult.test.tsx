import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResult from "./SearchResult";

test("renders learn react link", () => {
  // render(<SearchResult />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
