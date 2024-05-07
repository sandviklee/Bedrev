import { render, screen } from "@testing-library/react";
import Error from "../Error.tsx";
import { BrowserRouter as Router } from "react-router-dom";

describe("Error page", () => {
  test("renders correctly", () => {
    render(
      <Router>
        <Error error="Test error" />
      </Router>,
    );

    expect(
      screen.getByText(
        "Beklager, vi kunne ikke finne bedriften du leter etter :(",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Feilmelding: Test error")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Router>
        <Error error="Test error" />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
