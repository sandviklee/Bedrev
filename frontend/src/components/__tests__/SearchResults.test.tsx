import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import SearchResults from "../Search/SearchResults";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot, MutableSnapshot } from "recoil";
import {
  placeState,
  searchState,
  minValueState,
  maxValueState,
  sortState,
} from "../../atoms/atoms";

const getBedriftQuerySearch = (
  currentPage: number,
  searchValue: string,
  minDebounced: string,
  maxDebounced: string,
  place: string,
  sort: string,
) => gql`
    {
        bedriftSok(skip: ${
          currentPage > 0 ? (currentPage - 1) * 5 : 0
        }, navn: "${searchValue.toLowerCase().trim()}", lavest:${parseInt(
          minDebounced,
        )}, hoyest:${parseInt(
          maxDebounced,
        )}, postadresse_poststed: "${place.toUpperCase()}", sort: "${sort}") {
            navn
            postadresse_kommune
            antallansatte
            vedtektsfestetformaal
            organisasjonsnummer
        }
        bedriftSokCount(navn: "${searchValue
          .toLowerCase()
          .trim()}", lavest:${parseInt(minDebounced)}, hoyest:${parseInt(
          maxDebounced,
        )}, postadresse_poststed: "${place.toUpperCase()}")
    }
`;

const mocks = [
  {
    request: {
      query: getBedriftQuerySearch(1, "test", "0", "100", "PLACE", "sort"),
    },
    result: {
      data: {
        bedriftSok: [
          {
            navn: "Test Company",
            postadresse_kommune: "Oslo",
            antallansatte: 508,
            vedtektsfestetformaal: "Lage ting",
            organisasjonsnummer: 123456789,
          },
        ],
        bedriftSokCount: 1,
      },
    },
  },
];

const initializeState = (mutableSnapshot: MutableSnapshot) => {
  mutableSnapshot.set(placeState, "PLACE");
  mutableSnapshot.set(searchState, "test");
  mutableSnapshot.set(minValueState, "0");
  mutableSnapshot.set(maxValueState, "100");
  mutableSnapshot.set(sortState, "sort");
};

describe("SearchResults component", () => {
  test("should render companies", async () => {
    render(
      <Router>
        <RecoilRoot initializeState={initializeState}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <SearchResults />
          </MockedProvider>
        </RecoilRoot>
      </Router>,
    );

    await waitFor(() => screen.getByText("TEST COMPANY"));

    expect(screen.getByText("TEST COMPANY")).toBeInTheDocument();
    expect(screen.getByText("Oslo")).toBeInTheDocument();
    expect(screen.getByText("508")).toBeInTheDocument();
    expect(screen.getByText("Lage ting")).toBeInTheDocument();
  });

  test("should change page when pagination is clicked", async () => {
    render(
      <Router>
        <RecoilRoot initializeState={initializeState}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <SearchResults />
          </MockedProvider>
        </RecoilRoot>
      </Router>,
    );

    await waitFor(() => screen.getByText("1"));

    screen.getByText("1").click();

    expect(screen.getByText("1")).toHaveClass("Mui-selected");
  });

  test("matches snapshot", async () => {
    const { asFragment } = render(
      <Router>
        <RecoilRoot initializeState={initializeState}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <SearchResults />
          </MockedProvider>
        </RecoilRoot>
      </Router>,
    );

    await expect(asFragment()).toMatchSnapshot();
  });
});
