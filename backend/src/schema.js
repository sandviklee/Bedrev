const { gql } = require("apollo-server")

/**
 * This schema describes all the models, queries and mutations the 
 * Apollo server should be aware of.
 */
const typeDefs = gql `
 type bedrift {
    organisasjonsnummer: Int
    navn: String
    institusjonellsektorkode_beskrivelse: String
    antallansatte: Int
    hjemmeside: String
    postadresse_adresse: String
    postadresse_poststed: String
    postadresse_kommune: String
    stiftelsesdato: String
    naeringskode_beskrivelse: String
    vedtektsfestetformaal: String
  }

  type Review {
    id: Int
    title: String
    description: String
    rating: Int
    bedrift: bedrift
    postedBy: User
  }

  type Query {
    bedriftSok(skip: Int, navn: String, lavest: Int, hoyest: Int, postadresse_poststed: String, sort: String): [bedrift!]
    bedriftSokCount(navn: String, lavest: Int, hoyest: Int, postadresse_poststed: String): Int!
    bedriftByOrgNr(organisasjonsnummer: Int): bedrift! 
    reviewSok(skip: Int, organisasjonsnummer: Int, rating: Int, amount: Int): [Review!]
    reviewSokCount(organisasjonsnummer: Int, rating: Int): Int!
    reviewAverageByBedrift(organisasjonsnummer: Int): Float!
    me: User!
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createReview(title: String!, description: String!, rating: Int!, bedriftOrgNr: Int!, postedById: Int!): ReviewPayload!
    deleteReview(id: Int!): String!
  }

  type ReviewPayload {
    review: Review
  }

  type AuthPayload {
    token: String
  }

  type User {
    id: ID!
    token: String!
    email: String!
    password: String!
    reviews: [Review!]!
  }

`
module.exports = {
  typeDefs,
}