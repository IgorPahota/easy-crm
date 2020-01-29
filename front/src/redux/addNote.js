import {ADD_NOTES} from "./actions";

const AddNoteToList = (data) => {
  return {
    type: ADD_NOTES,
    // text: data[0],
    // creatorId: data[1]
    notes: data
  }
};

export default AddNoteToList;
