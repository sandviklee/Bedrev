import { describe, test, expect } from "vitest";
import Footer from "../Footer/Footer.tsx";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Footer component", () => {
  test("renders navigation links correctly", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    // The text is in a <p> tag, so we need to get the parent element which is the <a> tag
    const logoLink = screen.getByAltText("companylogo").closest("a");
    const homeLink = screen.getByText("Hjem").closest("a");
    const searchLink = screen.getByText("Søk bedrifter").closest("a");

    expect(logoLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
  });

  test("navigates to the correct routes", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    // The text is in a <p> tag, so we need to get the parent element which is the <a> tag
    const logoLink = screen.getByAltText("companylogo").closest("a");
    const homeLink = screen.getByText("Hjem").closest("a");
    const searchLink = screen.getByText("Søk bedrifter").closest("a");

    expect(logoLink?.getAttribute("href")).toBe("/");
    expect(homeLink?.getAttribute("href")).toBe("/");
    expect(searchLink?.getAttribute("href")).toBe("/sok-bedrifter");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
