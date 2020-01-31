import {
    ADD_CONTACTS,
    ADD_NOTES,
    DELETE_NOTE,
    EDIT_CONTACT,
    EDIT_NOTE,
    FILTER_CONTACTS,
    LEAD_REDIRECT,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SHOW_CONTACT,
    FETCH_NOTES,
    ADD_LEADCONTACT,
    DELETE_LEADCONTACT, ADD_LEADDETAILS
} from "./actions";

const InitialState = {
    isLoggedIn: false,
    username: undefined,
    email: undefined,
    id: '',
    contacts: [],
    filteredContacts: [],
    currentContact: {},
    notes: [],
    idLeadForRedirect: undefined,
    userType: undefined,
    leadcontacts: []


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
                notes: oldState.notes,
                userType: action.userType,
                leadcontacts: oldState.leadcontacts

            };
        case LOGOUT_SUCCESS:
            return {
                isLoggedIn: false
            };

        case ADD_CONTACTS:
            console.log(action.contacts);
            return {
                isLoggedIn: true,
                ...oldState,
                contacts: [
                    ...oldState.contacts.concat(action.contacts)
                ],
            };

        case FILTER_CONTACTS:
            if (action.contacts) {
                return {
                    ...oldState,
                    contacts: action.contacts
                }
            }
            break;

        case SHOW_CONTACT:
            return {
                ...oldState,
                currentContact: action.currentContact,
                // notes: oldState.notes
            };

        case ADD_NOTES:
            return {
                ...oldState,
                notes: [
                    ...oldState.notes.concat(action.notes)
                ]
            };

        case FETCH_NOTES:
            return {
                ...oldState,
                notes: action.notes
            };

        case DELETE_NOTE:
            const newNotes = oldState.notes.filter((el) => el._id !== action.id);
            return {
                ...oldState,
                notes: newNotes,
                currentContact: oldState.currentContact,
            };

        case EDIT_NOTE:
            const editedNotes = oldState.notes.map((note) => {
                if (note._id === action.id) {
                    return {...note, text: action.text, updated: action.updated}
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

        case EDIT_CONTACT:
            const editedContact = {
                _id: action.id,
                name: action.name,
                company: action.company,
                companyDetails: action.companyDetails,
                email: action.email,
                address: action.address,
                phone: action.phone,
                created: action.created,
                creatorId: action.creatorId,
                updated: action.updated
            };
            return {
                ...oldState,
                currentContact: editedContact
            };

        case ADD_LEADCONTACT:
            return {
                ...oldState,
                leadcontacts: [
                    ...oldState.leadcontacts.concat(action.leadcontacts)
                ]
            };

        case DELETE_LEADCONTACT:
            console.log('reducer', oldState.leadcontacts, action.leadcontacts)
          const newLeadcontacts = oldState.leadcontacts.filter(elem => elem === action.id)
            return {
                ...oldState,
                leadcontacts: newLeadcontacts
            };

        case ADD_LEADDETAILS:
            return {
                ...oldState,
                leadDetails: action.leadDetails
            };

        default:
            return oldState
    }

}
