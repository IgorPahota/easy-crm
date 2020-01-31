import {ADD_LEADDETAILS} from "./actions";

const AddLeadDetails = (data) => {
  return {
    type: ADD_LEADDETAILS,
    leadDetails: data
  }
};

export default AddLeadDetails;
