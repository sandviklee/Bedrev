import { Helmet } from "react-helmet";
import Field from "../components/Input/Field/Field";
import * as Form from "@radix-ui/react-form";
import Button from "../components/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import bedrevIcon from "/bedrevIcon.svg";
import bedrevLogoWhite from "/bedrevLogoWhite.svg";
import homepageArt from "/homepageArt.svg";
import bedrevLogo from "/bedrevLogo.svg";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorValue, setErrorValue] = useState<string>("");
  const navigate = useNavigate();

  const SIGNUP_MUTATION = gql`
        mutation {
        login(email: "${emailValue}", password: "${passwordValue}") {
            token
            }
        }`;

  const [login] = useMutation(SIGNUP_MUTATION, {
    onCompleted: async ({ login }) => {
      setErrorValue("");
      await localStorage.setItem("auth-token", login.token);
      navigate(-1); //Navigate to previous page.
    },
    onError: (error) => {
      setErrorValue(error.message);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>bedrev | Login</title>
        <link rel="icon" type="image/svg+xml" href={bedrevIcon} />
      </Helmet>
      <div className="w-full flex flex-row font-whyte">
        <div className="bg-purple w-[0px] h-screen sm:w-1/3 sm:min-w-[200px] sm:p-10 sm:pt-[8vh]">
          <Link to="/">
            <img
              src={bedrevLogoWhite}
              alt="companylogo"
              className="mb-[12vh]"
            />
          </Link>

          <img src={homepageArt} alt="login" />
        </div>
        <div className="flex-1 flex flex-col items-center font-whyte pt-[100px] sm:pt-[25vh] mx-[50px] sm:mx-[0px]">
          <div className="w-full sm:min-w-[400px] sm:w-1/2">
            <Link to="/">
              <img
                src={bedrevLogo}
                alt="companylogo"
                className="mb-8 sm:hidden"
              />
            </Link>
            <h3 className="text-3xl text-primary tracking-wider font-light">
              Velkommen
            </h3>
            <p className="pt-[20px] text-primary">
              Fyll inn innloggingsdetaljene dine for å logge inn
            </p>
            <Form.Root
              className="w-full mt-[20px] flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Field
                name="email"
                label="E-post"
                type="text"
                border={true}
                direction="col"
                placeholder="Skriv inn din E-post"
                value={emailValue}
                setValue={setEmailValue}
              />
              <Field
                name="password"
                label="Passord"
                type="password"
                border={true}
                direction="col"
                placeholder="Skriv inn ditt passord"
                value={passwordValue}
                setValue={setPasswordValue}
              />
              <div className="mt-2 w-full">
                <Button text="Logg inn" type="submit" onClick={() => login()} />
              </div>
              {errorValue !== "" && (
                <p className="text-red tracking-wide">{errorValue}</p>
              )}
              <Link to="/registrer" className="text-yellow self-end mt-1">
                Ingen bruker fra før? Registrer deg her
              </Link>
            </Form.Root>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
