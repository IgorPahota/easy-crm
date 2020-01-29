import {DELETE_NOTE} from "./actions";

const DeleteNote = (id) => {
  return {
    type: DELETE_NOTE,
    id: id
  }
};

export default DeleteNote;
