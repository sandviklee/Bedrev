import Router from "./Router";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";

const client = new ApolloClient({
  uri: "http://localhost:9090/",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ApolloProvider>
  );
};

export default App;
