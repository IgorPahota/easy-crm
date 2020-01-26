import {ADD_CONTACTS} from "./actions";
import {FILTER_CONTACTS} from "./actions";

export const AddContacts = (fetchedContacts) => {
  return {
    type: ADD_CONTACTS,
    contacts: fetchedContacts
  }
};

export const FilterContacts = (filtered) => {
  return {
    type: FILTER_CONTACTS,
    contacts: filtered
  }
};
