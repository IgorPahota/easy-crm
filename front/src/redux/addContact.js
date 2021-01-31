import {ADD_CONTACTS} from "./actions";
// А вот это action creator. Который возвращает action,
// то есть объект с данными и типом.
const AddContacts = (data) => {
  return {
    type: ADD_CONTACTS,
    contacts: data
  }
};

export default AddContacts;
