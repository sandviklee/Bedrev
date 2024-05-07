# Backend
_This part of the guide takes place in the /backend directory._

The backend consists of an Apollo Server, running with Prisma ORM and GraphQL. We use Postgresql as the actual database.

Full enhetsregister data is available and updated almost daily at [here](https://data.brreg.no/enhetsregisteret/oppslag/enheter/lastned/csv/v2) (a outdated version of the file is available in the repo and requires no further action). However this contains way more data than we need so some collomns get removed in prosecing.To do so make sure the csv you downloaded is in the backend folder and named "fullData.csv" (by default it will have a generated name corresponding to upload date etc)

-   Make sure every node pachage is installed with

```
npm install
```

-   Make sure the docker container as defined in "docker-compose.yml" is running to do so have docker and its compose module installed and run, if you don't have docker installed you can find it [here](https://docs.docker.com/get-docker/)

```
docker compose up -d
```

-   Just in case run `npx prisma migrate dev` and click yes to reset the database and enter a name for the migration if required. If this fails make sure the backend/prisma/migrations folder is empty and try again.
-   Then run `node scripts/fixtures.js` to initiate all the date into our table (it might take a while).
-   Then to turn on the backend run `npm start`
-   Enjoy