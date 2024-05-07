import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import Login from "../Login.tsx";

describe("Register page", () => {
  const SIGNUP_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
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
          login: {
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

    expect(screen.getByText("Velkommen")).toBeInTheDocument();
    expect(
      screen.getByText("Fyll inn innloggingsdetaljene dine for å logge inn"),
    ).toBeInTheDocument();
    expect(screen.getByText("Logg inn")).toBeInTheDocument();
    expect(
      screen.getByText("Ingen bruker fra før? Registrer deg her"),
    ).toBeInTheDocument();

    // check if fields are there
    expect(
      screen.getByPlaceholderText("Skriv inn din E-post"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Skriv inn ditt passord"),
    ).toBeInTheDocument();
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
      .getByText("Ingen bruker fra før? Registrer deg her")
      .closest("a");
    expect(button?.getAttribute("href")).toBe("/registrer");
  });
});
