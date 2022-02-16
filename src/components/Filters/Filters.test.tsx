import React from "react";
import { render, screen } from "@testing-library/react";
import Filtes from "./Filters";

test("renders learn react link", () => {
  // render(<Filter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
