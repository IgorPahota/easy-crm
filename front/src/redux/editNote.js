import {EDIT_NOTE} from "./actions";

const EditNote = (id, data, updated) => {
  return {
    type: EDIT_NOTE,
    id,
    text: data,
    updated
  }
};

export default EditNote;
