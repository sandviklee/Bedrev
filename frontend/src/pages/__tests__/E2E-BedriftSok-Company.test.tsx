import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import BedriftSok from "../BedriftSok.tsx";
import { RecoilRoot } from "recoil";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:9090/",
  cache: new InMemoryCache(),
});
// Mock ResizeObserver since it is not supported by testing environment
global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
};

describe("E2E test for BedriftSok and Company pages", () => {
  test("Displays correct companies no actions taken", async () => {
    render(
      <ApolloProvider client={client}>
        <Router>
          <RecoilRoot>
            <BedriftSok />
          </RecoilRoot>
        </Router>
      </ApolloProvider>,
    );
    const firstCompany = await screen.findByText(
      "110 AGDER IKS",
      {},
      { timeout: 2000 },
    );
    const lastCompany = await screen.findByText(
      "3M NORGE AS",
      {},
      { timeout: 2000 },
    );
    expect(firstCompany).toBeInTheDocument();
    expect(lastCompany).toBeInTheDocument();
  });

  test("Displays correct companies when filtering Z to A", async () => {
    render(
      <ApolloProvider client={client}>
        <Router>
          <RecoilRoot>
            <BedriftSok />
          </RecoilRoot>
        </Router>
      </ApolloProvider>,
    );
    const sortButton = await screen.findByText("Bedriftnavn A til Z");
    userEvent.click(sortButton);
    const sortZA = await screen.findByText("Bedriftnavn Z til A");
    userEvent.click(sortZA);

    const firstCompany = await screen.findByText(
      "ZYNKRON AS",
      {},
      { timeout: 2000 },
    );
    const lastCompany = await screen.findByText(
      "ZOOEXPRESSEN AS",
      {},
      { timeout: 2000 },
    );
    expect(firstCompany).toBeInTheDocument();
    expect(lastCompany).toBeInTheDocument();
  });

  test("Displays correct company when searching for a company", async () => {
    render(
      <ApolloProvider client={client}>
        <Router>
          <RecoilRoot>
            <BedriftSok />
          </RecoilRoot>
        </Router>
      </ApolloProvider>,
    );
    const searchField = await screen.findByPlaceholderText(
      "Søk etter en bedrift...",
    );
    userEvent.type(searchField, "kantega");
    const company = await screen.findByText(
      "KANTEGA AS",
      {},
      { timeout: 2000 },
    );
    expect(company).toBeInTheDocument();
  });
});
