import {ADD_CONTACTS} from "./actions";

const AddContacts = (data) => {
  return {
    type: ADD_CONTACTS,
    contacts: data
  }
};

export default AddContacts;
