const { prisma } = require("../database.js");
const { authenticateUser } = require("../decodedToken.js")

/**
 * All defined queries for the backend.
 */
const Query = {
  bedriftSok: (parent, args) => {
    return prisma.bedrift.findMany({skip: args.skip, 
      take: 5, 
      orderBy: {navn: args.sort},
      where: {navn: {contains: args.navn}, 
      antallansatte: {lte: args.hoyest, gte: args.lavest}, 
      postadresse_poststed: {contains: args.postadresse_poststed}}})
  },

  bedriftSokCount: (parent, args) => {
    return prisma.bedrift.count({where: {navn: {contains: args.navn}, 
      antallansatte: {lte: args.hoyest, gte: args.lavest}, 
      postadresse_poststed: {contains: args.postadresse_poststed}}})
  },

  bedriftByOrgNr: (parent, args) => {
    return prisma.bedrift.findFirst({where: {organisasjonsnummer: args.organisasjonsnummer}})
  },

  reviewSok: (parent, args) => {
    return prisma.review.findMany({skip: args.skip, 
      take: args.amount, 
      where: {bedrift: {organisasjonsnummer: args.organisasjonsnummer}, rating: args.rating}, 
      orderBy: {title: 'desc'}})
  },

  reviewSokCount: (parent, args) => {
    return prisma.review.count({where: {bedrift: {organisasjonsnummer: args.organisasjonsnummer}, rating: args.rating}})
  },

  /**
   * Calculates the average reviews on the given company.
   * @returns average of all reviews on that company
   */
  reviewAverageByBedrift: async (parent, args) => {
    const reviews = await prisma.review.findMany({where: {bedrift: {organisasjonsnummer: args.organisasjonsnummer}}})
    if (reviews.length == 0) {
      return 0;
    }
    let avg = 0
    const review_ratings = reviews.map((review) => avg += review["rating"])
    avg /= review_ratings.length
    avg = Math.floor(avg*10)/10
    return avg;
  },

  me: async (parent, args, context) => {
    const user = await authenticateUser(context.authorization);
    if (user == null) {
      throw new Error("Unauthenticated!")
    }
    return user;
  }

};

module.exports = {
  Query,
}