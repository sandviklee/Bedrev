import { test, describe, expect } from "vitest";
import CompanyCard from "../Company/CompanyCard.tsx";
import { render, screen } from "@testing-library/react";

describe("CompanyCard component", () => {
  const mockCompany = {
    navn: "Bedrift",
    vedtektsfestetformaal: "Lage ting",
    organisasjonsnummer: 123456789,
    antallansatte: 100,
    postadresse_kommune: "Oslo",
  };

  test("renders correctly", () => {
    render(<CompanyCard {...mockCompany} />);
    expect(screen.getByText("Bedrift")).toBeInTheDocument();
    expect(screen.getByText("Lage ting")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Oslo")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<CompanyCard {...mockCompany} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
