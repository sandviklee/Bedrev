import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "@apollo/client";
import ReviewCreator from "../Reviews/ReviewCreator.tsx";

const USER_QUERY = gql`
  query {
    me {
      id
      reviews {
        postedBy {
          reviews {
            bedrift {
              organisasjonsnummer
            }
          }
        }
      }
    }
  }
`;

const REVIEW_MUTATION = gql`
  mutation {
    createReview(
      title: "Test title"
      description: "Test description"
      rating: 1
      bedriftOrgNr: 123456789
      postedById: 1
    ) {
      review {
        id
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: USER_QUERY,
    },
    result: {
      data: {
        me: {
          id: 1,
          reviews: [],
        },
      },
    },
  },
  {
    request: {
      query: REVIEW_MUTATION,
    },
    result: {
      data: {
        createReview: {
          review: {
            id: 1,
          },
        },
      },
    },
  },
];

describe("ReviewCreator component", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ReviewCreator bedriftOrgNr="123456789" />
        </MockedProvider>
      </Router>,
    );

    expect(
      await screen.findByText("Skriv en tilbakemelding"),
    ).toBeInTheDocument();
    // click button to open dialog
    screen.getByText("Skriv en tilbakemelding").click();

    // check if fields and stuff are there
    expect(
      await screen.findByPlaceholderText("Skriv en tittel her..."),
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText("Skriv en tilbakemelding her..."),
    ).toBeInTheDocument();
    expect(await screen.findByText("Gi en vurdering")).toBeInTheDocument();
    expect(await screen.findByText("Send inn")).toBeInTheDocument();
  });

  test("matches snapshot", async () => {
    const { asFragment } = render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ReviewCreator bedriftOrgNr="123456789" />
        </MockedProvider>
      </Router>,
    );
    expect(
      await screen.findByText("Skriv en tilbakemelding"),
    ).toBeInTheDocument();
    screen.getByText("Skriv en tilbakemelding").click();
    expect(await asFragment()).toMatchSnapshot();
  });
});
