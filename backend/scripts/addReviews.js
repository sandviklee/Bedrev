//This script is no longer in use, but is kept for future reference
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function insertReviews() {
  try {
    // Define the data for the new reviews
    const reviewsData = [
      {
        title: 'Review 1',
        description: 'This is the first review',
        rating: 4,
        bedriftId: 811167452, // Replace with the appropriate "bedriftId"
      },
      {
        title: 'Review 2',
        description: 'This is the first review',
        rating: 2,
        bedriftId: 811167452, // Replace with the appropriate "bedriftId"
      },
      {
        title: 'Review 3',
        description: 'This is the first review',
        rating: 5,
        bedriftId: 811167452, // Replace with the appropriate "bedriftId"
      },
    ];

    // Insert the reviews into the database
    const createdReviews = await prisma.review.createMany({
      data: reviewsData,
      skipDuplicates: true, // Skip duplicates if needed
    });

    console.log('Inserted reviews:', createdReviews);
  } catch (error) {
    console.error('Error inserting reviews:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertReviews();
