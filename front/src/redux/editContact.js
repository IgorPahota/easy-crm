import {EDIT_CONTACT} from "./actions";

const EditContact = (data) => {
  return {
    type: EDIT_CONTACT,
    id: data[0],
    name:  data[1],
    company:  data[2],
    companyDetails: data[3],
    email:  data[4],
    address:  data[5],
    phone: data[6],
    created: data[7],
    creatorId: data[8],
    updated: data[9]
  }
};

export default EditContact;
