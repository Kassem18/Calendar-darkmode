import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    // You can add specific assertions here, for example:
    // expect(screen.getByText(/calendar/i)).toBeInTheDocument();
  });
});
