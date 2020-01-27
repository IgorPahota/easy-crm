import {SHOW_CONTACT} from "./actions";

const ShowContact = (contact) => {
  return {
    type: SHOW_CONTACT,
    currentContact: contact
  }
};

export default ShowContact;
