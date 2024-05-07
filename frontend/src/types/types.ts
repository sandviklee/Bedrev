export type Company = {
  navn: string;
  vedtektsfestetformaal: string;
  organisasjonsnummer: number;
  antallansatte: number;
  postadresse_kommune: string;
};

export type ReviewType = {
  title: string;
  description: string;
  rating: number;
  id: number;
};

export type ReviewJSON = {
  id: number;
  bedrift: Company;
  postedBy: User;
};

export type NavbarData = {
  title: string;
  link: string;
};

type User = {
  id: number;
  email: string;
  password: string;
  reviews: [];
};
