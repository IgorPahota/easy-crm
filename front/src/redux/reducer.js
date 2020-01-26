import {ADD_CONTACTS, FILTER_CONTACTS, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "./actions";

const InitialState = {
    isLoggedIn: false,
    username: undefined,
    email: undefined,
    id: undefined,
    contacts: [],
    filteredContacts: []
};

export default function (oldState = InitialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                username: action.username,
                email: action.email,
                id: action.id
            };
        case LOGOUT_SUCCESS:
            return {
                isLoggedIn: false
            };

        case ADD_CONTACTS:
            if (action.contacts) {
                return {
                    contacts: [
                        ...oldState.contacts.concat(action.contacts)
                    ]
                }
            }
            break;

            case FILTER_CONTACTS:
            if (action.contacts) {
                return {
                    contacts: action.contacts
                }
            }
            break;


        default:
            return oldState
    }

}
