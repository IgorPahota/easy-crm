import {ADD_NOTES} from "./actions";

const AddNoteToList = (data) => {
  return {
    type: ADD_NOTES,
    notes: data
  }
};

export default AddNoteToList;
