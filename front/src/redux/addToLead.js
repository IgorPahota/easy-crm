import {ADD_LEADCONTACT} from "./actions";

const AddLeadContact = (object) => {
  return {
    type: ADD_LEADCONTACT,
    leadcontacts: object
  }
};

export default AddLeadContact;
