import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import Filters from "./Filters";

const mockFilterSelectOptions = [{ value: "Specialty", label: "Specialty" }];
const mockHandleFilterClick = () => {
  return;
};

describe("Filters", () => {
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
  test("renders react-select filter drop-down", () => {
    render(
      <Filters
        handleFilterClick={mockHandleFilterClick}
        filterSelectOptions={mockFilterSelectOptions}
      />
    );
    const placeholderElement = screen.getByText(/Filter by specialties/i);
    expect(placeholderElement).toBeInTheDocument();
  });
});
