const { prisma } = require("../database.js");
const { hash, compare } = require("bcryptjs");
const { secret, authenticateUser } = require("../decodedToken.js")
const { sign } = require("jsonwebtoken");

/**
 * The mutations for the backend.
 * The error messages are in norwegian
 * because they are pushed to the frontend.
 */
const Mutation = {
    signup: async (parent, args) => {
      const userExists = await prisma.user.findUnique({
        where: {email: args.email}
      });

      if (userExists) {
        throw new Error("Brukeren finnes allerede!");
      }
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const valid = emailRegex.test(args.email);

      if (!valid) {
        throw new Error("Email adressen er skrevet feil")
      }

      const password = await hash(args.password, 10);
      const email = args.email.toLowerCase()
      const user = await prisma.user.create({
        data: {...args, email, password},
      });
      const token = sign({ userId: user.id}, secret);
      return  {
        token, 
      };
    },

    login: async (parent, args) => {
      const email = args.email.toLowerCase();
      const user = await prisma.user.findUnique({
        where: {email: email}
      });

      if (!user) {
        throw new Error("Brukeren finnes ikke!")
      }
      
      // Compare the hashed password with the given
      const valid = await compare(args.password, user.password);
      if (!valid) {
        throw new Error("Passordet er feil")
      }

      const token = sign({ userId: user.id }, secret)

      return {
        token,
      }
    },

    createReview: async (parent, args) => {
      const hasReview = await prisma.review.findFirst({
        where: {postedById: args.postedById, bedriftOrgNr: args.bedriftOrgNr}
      })
      if (hasReview) {
        throw new Error("Du har allerede skrevet en tilbakemelding på denne bedriften!");
      }

      if (args.title == "") {
        throw new Error("Tittlen kan ikke være tom!")
      }

      if (args.title.length > 30) {
        throw new Error("Tittelen må være kortere enn 30 tegn!")
      }

      if (args.description == "") {
        throw new Error("Tilbakemeldingen kan ikke være tom!")
      }

      if (args.description.length > 100) {
        throw new Error("Tilbakemeldingen må være kortere enn 100 tegn!")
      }
      const review = await prisma.review.create({data: {...args}})
  
      return {
        review
      }
    },

    deleteReview: async (parent, args, context) => {
      // Needs user to authorize the deletion
      const user = await authenticateUser(context.authorization);
      if (user == null) {
        throw new Error("Unauthenticated!")
      }

      const review = await prisma.review.delete({where: {id: args.id, postedById: user.id}})
      return `Deleted review id: ${args.id} from the db!`
    }
  };

module.exports = {
  Mutation,
}