import { MockedProvider } from "@apollo/client/testing";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Review from "../Reviews/Review.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "@apollo/client";

describe("Review component", () => {
  const mockReview = {
    title: "Test",
    rating: 5,
    description: "This is a test",
    id: 1,
  };

  const mocks = [
    {
      request: {
        query: gql`
          query {
            me {
              reviews {
                id
              }
            }
          }
        `,
      },
      result: {
        data: {
          me: {
            reviews: [
              { id: 1 },
              // Add more reviews if needed
            ],
          },
        },
      },
    },
    {
      request: {
        query: gql`
          mutation {
            deleteReview(id: 1)
          }
        `,
      },
      result: {
        data: {
          deleteReview: true, // Assume the mutation returns a boolean
        },
      },
    },
  ];

  test("renders correctly", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <Review {...mockReview} />
        </Router>
      </MockedProvider>,
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("This is a test")).toBeInTheDocument();
    expect(screen.getByText("5/5")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <Review {...mockReview} />
        </Router>
      </MockedProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
