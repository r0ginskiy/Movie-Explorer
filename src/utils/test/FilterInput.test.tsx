import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, beforeEach } from "vitest";
import AutocompleteFilter from "../../components/Filter/FilterInput";

describe("AutocompleteFilter", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const onChangeMock = vi.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it("renders correctly and displays label", () => {
    render(
      <AutocompleteFilter
        id="autocomplete-test"
        options={options}
        label="Test Label"
        onChange={onChangeMock}
      />
    );
    expect(screen.getByRole("combobox", { name: "Test Label" })).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", async () => {
    render(
      <AutocompleteFilter
        id="autocomplete-test"
        options={options}
        label="Test Label"
        onChange={onChangeMock}
      />
    );
    const input = screen.getByRole("combobox", { name: "Test Label" });
    userEvent.click(input);
    const listbox = await screen.findByRole("listbox");
    const option = await screen.findByText("Option 1");
    userEvent.click(option);
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith("Option 1");
    });
  });
});
