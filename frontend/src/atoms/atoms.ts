import { atom } from "recoil";

/**
 * Global state management for all filters/sorts.
 * Done with recoil.
 */

export const placeState = atom({
  key: "place",
  default: sessionStorage.getItem("place") || "",
});

export const searchState = atom({
  key: "search",
  default: sessionStorage.getItem("search") || "",
});

export const minValueState = atom({
  key: "minValue",
  default: sessionStorage.getItem("minValue") || "0",
});

export const maxValueState = atom({
  key: "maxValue",
  default: sessionStorage.getItem("maxValue") || "10000",
});

export const sortState = atom({
  key: "sort",
  default: sessionStorage.getItem("sort") || "asc",
});

export const ratingState = atom({
  key: "rating",
  default: 0,
});
