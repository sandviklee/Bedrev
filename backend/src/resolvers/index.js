const { prisma } = require("../database.js");
const { Query } = require("./query.js");
const { Mutation } = require("./mutations.js");

const bedrift = {
  organisasjonsnummer: (parent) => parent.organisasjonsnummer,
  navn: (parent) => parent.navn,
  institusjonellsektorkode_beskrivelse: (parent) => parent.institusjonellsektorkode_beskrivelse,
  antallansatte: (parent) => parent.antallansatte,
  hjemmeside: (parent) => parent.hjemmeside,
  postadresse_adresse: (parent) => parent.postadresse_adresse,
  postadresse_kommune: (parent) => parent.postadresse_kommune,
  postadresse_poststed: (parent) => parent.postadresse_poststed,
  stiftelsesdato: (parent) => parent.stiftelsesdato,
  naeringskode_beskrivelse: (parent) =>  parent.naeringskode_beskrivelse,
  vedtektsfestetformaal: (parent) => parent.vedtektsfestetformaal
};

const Review = {
  id: (parent) => parent.id,
  title: (parent) => parent.title,
  description: (parent) => parent.description,
  rating: (parent) => parent.rating,
  bedrift: (parent) => {
    return prisma.bedrift.findUnique({where: {organisasjonsnummer: parent.bedriftOrgNr}})
  },
  postedBy: (parent) => {
    return prisma.user.findUnique({where: {id: parent.postedById}})
  }
};

const User = {
  id: (parent) => parent.id,
  token: (parent) => parent.token,
  email: (parent) => parent.email,
  password: (parent) => parent.password,
  reviews: (parent) => {return prisma.review.findMany({where: {postedById: parent.id}})},
}

const resolvers = {
  bedrift,
  Review,
  User,
  Mutation,
  Query,
};

module.exports = {
  resolvers,
};
