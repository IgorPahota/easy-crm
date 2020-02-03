import {FETCH_CONTACTS_TO_LEAD} from "./actions";

const FetchContactsToLead = (arr) => {
  return {
    type: FETCH_CONTACTS_TO_LEAD,
    leadcontacts: arr
  }
};

export default FetchContactsToLead;
