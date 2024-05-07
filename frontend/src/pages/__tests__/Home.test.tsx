import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../Home.tsx";

describe("Home page", () => {
  test("renders correctly", () => {
    render(
      <Router>
        <HomePage />
      </Router>,
    );
    expect(screen.getByText("Se gjennom bedrifter,")).toBeInTheDocument();
    expect(
      screen.getByText("finn din neste arbeidsgiver!"),
    ).toBeInTheDocument();
    expect(screen.getByText("Søk gjennom bedrifter")).toBeInTheDocument();
    expect(
      screen.getByText("Skriv tilbakemeldinger til Bedrifter!"),
    ).toBeInTheDocument();
    expect(screen.getByText("Anonym om Bekk Consulting")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Router>
        <HomePage />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("Has navbar", () => {
    render(
      <Router>
        <HomePage />
      </Router>,
    );
    expect(screen.getByText("Logg Inn")).toBeInTheDocument();
  });

  test("Has footer", () => {
    render(
      <Router>
        <HomePage />
      </Router>,
    );
    expect(screen.getByText("©2023")).toBeInTheDocument();
  });

  test("Button navigates to correct route", () => {
    render(
      <Router>
        <HomePage />
      </Router>,
    );
    const button = screen.getByText("Søk gjennom bedrifter").closest("a");
    expect(button?.getAttribute("href")).toBe("/sok-bedrifter");
  });
});
