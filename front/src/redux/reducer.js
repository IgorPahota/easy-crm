import {
    ADD_CONTACTS,
    SHOW_CONTACT,
    FILTER_CONTACTS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    ADD_NOTES,
    DELETE_NOTE,
    EDIT_NOTE,
    LEAD_REDIRECT
} from "./actions";

const InitialState = {
    isLoggedIn: false,
    username: undefined,
    email: undefined,
    id: undefined,
    contacts: [],
    filteredContacts: [],
    currentContact: {},
    notes: [],
    idLeadForRedirect: undefined
};

export default function (oldState = InitialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                username: action.username,
                email: action.email,
                id: action.id,
                contacts: action.contacts,
                currentContact: oldState.currentContact,
                notes: oldState.notes
            };
        case LOGOUT_SUCCESS:
            return {
                isLoggedIn: false
            };

        case ADD_CONTACTS:
                return {
                    isLoggedIn: true,
                    id: oldState.id,
                    contacts: [
                      ...oldState.contacts.concat(action.contacts)
                    ],
                };

            case FILTER_CONTACTS:
            if (action.contacts) {
                return {
                    contacts: action.contacts
                }
            }
            break;

        case SHOW_CONTACT:
                return {
                    currentContact: action.currentContact,
                    notes: oldState.notes
                };

        case ADD_NOTES:
            return {
                ...oldState,
                notes: [
                    ...oldState.notes.concat(action.notes)
                ],
            };

        case DELETE_NOTE:
            const newNotes = oldState.notes.filter((el) => el._id !== action.id);
            return {
                notes: newNotes,
                currentContact: oldState.currentContact,
            };

        case EDIT_NOTE:
            const editedNotes = oldState.notes.map((note) => {
                if (note._id === action.id) {
                    return { ...note, text: action.text, updated: action.updated }
                } else {
                    return note;
                }
            });
            return {
                ...oldState,
                notes: editedNotes
            };

        case LEAD_REDIRECT:
            return {

                ...oldState,
                idLeadForRedirect: action.idLeadForRedirect
            };
        default:
            return oldState
    }
}
