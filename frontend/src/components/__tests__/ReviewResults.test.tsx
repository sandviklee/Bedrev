import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import ReviewResults from "../Reviews/ReviewResults";
import { RecoilRoot, MutableSnapshot } from "recoil";
import { ratingState } from "../../atoms/atoms";
import { BrowserRouter as Router } from "react-router-dom";

const REVIEW_QUERY = gql`
    {
        reviewSok(organisasjonsnummer: ${0}, amount: ${3}, skip: ${0}, rating: ${5}) {
            title
            description
            rating
            id
        }
        reviewSokCount(organisasjonsnummer: ${0}, rating: ${5})
    }
`;

const mocks = [
  {
    request: {
      query: REVIEW_QUERY,
    },
    result: {
      data: {
        reviewSok: [
          {
            title: "Test Review",
            description: "This is a test review.",
            rating: 5,
            id: 0,
          },
        ],
        reviewSokCount: 1,
      },
    },
  },
];

const initializeState = (mutableSnapshot: MutableSnapshot) => {
  mutableSnapshot.set(ratingState, 5);
};

describe("ReviewResults component", () => {
  test("should render loading state initially", () => {
    const { getByText } = render(
      <Router>
        <RecoilRoot initializeState={initializeState}>
          <MockedProvider mocks={[]}>
            <ReviewResults bedrift="0" />
          </MockedProvider>
        </RecoilRoot>
      </Router>,
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("should render reviews", async () => {
    render(
      <Router>
        <RecoilRoot initializeState={initializeState}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ReviewResults bedrift="0" />
          </MockedProvider>
        </RecoilRoot>
      </Router>,
    );

    await waitFor(() => screen.getByText("Test Review"));

    expect(screen.getByText("Test Review")).toBeInTheDocument();
    expect(screen.getByText("This is a test review.")).toBeInTheDocument();
  });

  test("matches snapshot", async () => {
    const { asFragment } = render(
      <Router>
        <RecoilRoot initializeState={initializeState}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ReviewResults bedrift="0" />
          </MockedProvider>
        </RecoilRoot>
      </Router>,
    );

    expect(await asFragment()).toMatchSnapshot();
  });
});
