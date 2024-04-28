import { render, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar component", () => {
  test("calls onSearch prop with the correct value when search button is clicked", () => {
    const mockOnSearch = jest.fn();

    const { getByLabelText, getByText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    const input = getByLabelText("Enter location for weather results!");
    fireEvent.change(input, { target: { value: "New York" } });

    const searchButton = getByText("Search");
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("New York");
  });
});
