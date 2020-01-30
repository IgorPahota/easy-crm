import {DELETE_LEADCONTACT} from "./actions";

const DeleteContactFromLead = (id) => {
  return {
    type: DELETE_LEADCONTACT,
    id: id
  }
};

export default DeleteContactFromLead;
