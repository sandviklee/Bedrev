import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import Login from "../Registrer.tsx";

describe("Register page", () => {
  const SIGNUP_MUTATION = gql`
    mutation Signup($email: String!, $password: String!) {
      signup(email: $email, password: $password) {
        token
      }
    }
  `;

  const mocks = [
    {
      request: {
        query: SIGNUP_MUTATION,
        variables: {
          email: "test@test.com",
          password: "testpassword",
        },
      },
      result: {
        data: {
          signup: {
            token: "testtoken",
          },
        },
      },
    },
  ];

  test("renders correctly", () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </Router>,
    );

    expect(screen.getByText("Registrer ny bruker")).toBeInTheDocument();
    expect(
      screen.getByText("Fyll inn feltene for å registrere deg"),
    ).toBeInTheDocument();
    expect(screen.getByText("Registrer deg")).toBeInTheDocument();
    expect(
      screen.getByText("Har du allerede bruker? Logg inn her"),
    ).toBeInTheDocument();

    // check if fields are there
    expect(
      screen.getByPlaceholderText("Skriv inn din E-post"),
    ).toBeInTheDocument();
    const passwordFields = screen.getAllByPlaceholderText(
      "Skriv inn ditt passord",
    );
    expect(passwordFields.length).toBe(2);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("navigate to correct route", () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </Router>,
    );
    const button = screen
      .getByText("Har du allerede bruker? Logg inn her")
      .closest("a");
    expect(button?.getAttribute("href")).toBe("/logg-inn");
  });
});
