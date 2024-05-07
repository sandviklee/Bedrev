# How does the project work?

A little summary of all the different choices we have made during this project.

### The dataset

As mentioned earlier the full enhetsregister data is available and updated almost daily at [here](https://data.brreg.no/enhetsregisteret/oppslag/enheter/lastned/csv/v2), we chose to filter out some columns that we did not need. And in addition since some fields are optional to fill, the dataset is further shortened to those who report the number of employees and have a website to make things nicer. This is done in the backend/scripts/fixtures.js file. All data is then inserted into the database using regular sql.

### Technologies in use

For our backend we use Apollo Server, running with Prisma ORM and GraphQL. We use Postgresql as the actual database. We chose this combination because it is easy to use and has a lot of documentation (also we found a nice guide). We also use docker to make sure everyone has the same environment and to make it easier to run the project locally and deploy on the vm. Furthermore to simplify the process of deploying our project to the vm we have developed a bach script that does most of the work for us (not without its hurdles as the permissions we have on the vm are somewhat strange). You can find this in [vmguide.md](vmguide.md).

### State management

Outside of just using React State management locally, we have also used Recoil for global state management.
This has been used for filtering/sorting on reviews and search, to make the whole process less complicated.
All the global states are under the /atoms folder in src.

### Debounced input

We have chosen to use debounced input in all the fields provided on the website. This is because it lessenes the query amount. If you haven't finished writing the place or number, it should not query instantly.

### Schema

Our database consists of a User, "bedrift" or Company (Reason this name is in norwegian was because we were scared to break the naming convention used in the dataset), and Review.

### API

The open running API consists of both queries and mutations.

#### Queries

Queries are used when you want to fetch data, or want to POST data (specify paramters to a fetch).
This is for example getting the company page, or the companies available in the database.

##### Company (Bedrift)

###### BedriftSok and BedriftSokCount

These both let you query and get companies with a lot of different parameters. They are both almost the same, but count returns a number and does not skip (this is for paging in frontend).

The main parameters used are "skip", "sort", "navn", "lavest", "hoyest" and "postadresse_poststed".
These all help our filtering.
"skip": Used to skip a certain amount of companies, as mentioned, used for paging.
"sort": "asc" or "desc" used for sorting the results.
"navn": is queried to find a company by name.
"lavest" and "hoyest": are used to find the set of amount of workers at a company.
"postadresse_poststed": is used to find a certain company at a place through the filters, like "Bodø".

###### BedriftByOrgNr

More of a simple fetch, you get company information using the org number.
This one is used when fetching a certain company page.

The main paramteres used are "organisasjonsnummer".

##### Reviews

###### ReviewSok and ReviewSokCount

These are similar to the earlier search queries from companies.

The main paramteres are mostly the same, but instead "skip", "organisasjonsnummer", "rating" and "amount".
"skip": used to skip a certain amount of reviews for paging
"organisasjonsnummer": used to find the reviews for a given company.
"rating": used to filter the given result.
"amount": changes the amount of reviews queried.

###### ReviewAverageByBedrift

This query is very calculation heavy, and calculated the average rating from the given reviews on that company.

The only parameter used here is "organisasjonsnummer", which is used to find the company.

##### Users

The "me" query returns a user if the query is from a authenticated state.
It is used when trying to mutate the db for security reasons.
This query also uses the "authenticateUser" function, defined in "decodedToken.js", because it recieves a hashed token, which is used to find the correct user.
The only way you can create reviews for example is the first query "me" and let the headers actually decide if you have a user or not.

A user is necessary for example to create a review based on the correct user.

#### Mutations

Mutations are used to "change" the database. This is for example when you want to create or delete a review, or create a user.

##### Users

There are two mutations in the backend for users, login and signup.

###### Signup

As in the name creates a new user and adds it to the database.
It also does some error checking such if a user already exists with that email address,
or if the email address is written correctly.
It then creates a token, with jwt "sign" function, which uses a "SECRET" to hash, and returns it to the frontend.
This is as earlier explained in "me" query, used to authenticate a user before they are allowed to mutate the db further.

###### Login

Also as in the name, it authenticates the users email and password, and checks if it exists in the db.
If it exists, then it returns a hashed token just like Signup.
If not, then it returns error codes, both for wrong password and a not existing user.

##### Reviews

###### CreateReview

Again, in the name, it creates a review, based on the "postedById" which is a user, and "bedriftOrgNr" which is the company.
It has alot of different error checking, I will not list them up, but in short it is for too long messages or too long titles etc.

###### DeleteReview

Deletes a review, if the user is authorized to do so (the user owns that review).

### Components

There are many components used to make this project.

The components we have are:

-   Button: Used for styling our button type
-   CompanyCard: The fetched company in search
-   Footer: The footer on each page
-   Icon: Used to easily add icons to the project
-   KeyPoint: This is an Icon and text under it, used many times in the Company page.
-   Gallery: Made to show images from an image list.
-   Checkbox: The filtering checkboxes used on the company search page.
-   Field: Used as a search field, number field, text field, etc...
-   Navbar: The navbar on each page
-   Dropdownmenu: the menu in the navbar which holds all the links when the page is on phone size.
-   Review: The main review component
-   ReviewCreator: The button and part that creates the review
-   ReviewResults: All the reviews for a given company and sorting and filtering paramters.
-   SimpleReview: Fake review used on the home page
-   SearchResults: All the given companies fetched with different sorting and filtering paramters.

#### Reasoning behind using two icon components

Something that you may notice is the fact that we have two components using the React Icons library. This is a decision made to make it easier to differentiate when both are used. The keypoint component only needs so many icons, and therefore it made more sense to not use the icons component here, since it has more features keypoint never would use.

#### Why is the gallery still present?

The gallery was a fun side project to make work in our spare time not developing the important features. We think it would be a great addition to show some cool styling and web design. Unfortunately we couldn't get this working dynamically in time, since we would have to host the images on another server. Therefore we have just let it be, since it looks in place for the design and works with the stock images.

#### Libraries used in the components

We have used both MUI and RadixUI when creating different components for the project.
This is for ease of use, and saves us a lot of time.

We have also used "Classnames" when deemed necessary. This is to use the same tailwind classes on different tags.

An example of a component using the MUI library is the Stars used in the Company page and reviews.
The Field and Gallery also uses RadixUI.

### Styling

We have used tailwind for styling most of the project. This is because our members wanted to learn and use tailwind. We found it much smoother to work with, and made the process faster.

Only times tailwind is not used is the "css modules" under component folders. This is because some of the RadixUI components needed base styling, and was easier to setup that way.

### Testing

We have tests for most of our non-trivial code. We used vitest and @testing-library to make our tests as instructed by the taks. In addition to lots of manual testing for all our queries as well as the frontend (media queries in particular). We therefore have end to end testing also.

#### What is tested?

-   All components that are not trivial
-   Most pages
-   Snapshot testing for all components and most pages
-   One End-to-End test that checks the search functionality based on the dataset we have. It was our intention to test this more extensively but we faced some technical difficulties with the testing library and decided to focus on other parts of the project instead.
-   Desing and usability of the website on different screen sizes
