import {ADD_CONTACTS} from "./actions";

const AddContacts = (fetchedContacts) => {
  return {
    type: ADD_CONTACTS,
    contacts: fetchedContacts
  }
};

export default AddContacts;
