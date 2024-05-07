# Project 2 - bedrev

## Table of Contents

- [Project 2 - bedrev](#project-2---bedrev)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation \& Setup](#installation--setup)

## Description

For our second project we decided to make a company review website. In which employes can review their company and give it a rating anonymously. Using data from Brønnøysundregisteret we can get information about all the companies and display it on the website in a searchable and filterable fashion.

## Before Installing

To run the app locally, you need to change the query API address which is in filelocation:
**frontend/src/App.tsx**

```tsx
const client = new ApolloClient({
  uri: "http://localhost:9090" <-- Change to this from "http://it2810-37.idi.ntnu.no:9090/"
  ...
})
...

```

## Installation & Setup

To run the app locally follow instructions bellow (_you need to have [Node.js](https://nodejs.org/en/) v20.5+ installed_)

Clone repository:

```
git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-37/prosjekt-2.git
```

Install dependencies:

```
npm install
```

Build the app:

```
npm run build
```

Run the app:

```
npm run preview
```

then click on the link given.
