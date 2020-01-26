import {FILTER_CONTACTS} from "./actions";

export const FilterContacts = (filtered) => {
  return {
    type: FILTER_CONTACTS,
    contacts: filtered
  }
};

export default FilterContacts;
