import {FETCH_NOTES} from "./actions";

const FetchNotesOnload = (data) => {
  return {
    type: FETCH_NOTES,
    notes: data
  }
};

export default FetchNotesOnload;
