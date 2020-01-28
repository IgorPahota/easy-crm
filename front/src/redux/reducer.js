import {ADD_CONTACTS, SHOW_CONTACT, FILTER_CONTACTS, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "./actions";

const InitialState = {
    isLoggedIn: false,
    username: undefined,
    email: undefined,
    id: undefined,
    contacts: [],
    filteredContacts: [],
    currentContact: {}
};

export default function (oldState = InitialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                username: action.username,
                email: action.email,
                id: action.id,
                contacts: action.contacts
            };
        case LOGOUT_SUCCESS:
            return {
                isLoggedIn: false
            };

        case ADD_CONTACTS:
                console.log('action.contacts', action.contacts);
                return {
                    isLoggedIn: true,
                    contacts: [
                      ...oldState.contacts.concat(action.contacts)
                    ],
                    // isLoggedIn: oldState.isLoggedIn,
                    // username: oldState.username,
                    // email: oldState.email,
                    // id: oldState.id
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
                    currentContact: action.currentContact
                };
        default:
            return oldState
    }
}
