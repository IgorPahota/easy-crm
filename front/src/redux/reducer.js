import {LOGIN_SUCCESS} from "./actions";

const InitialState = {
    isLoggedIn: false,
    username: undefined,
    email: undefined,
    id: undefined
};

export default function (oldState = InitialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                username: action.username,
                email: action.email,
                id: action.id
            }
        default:
            return oldState
    }

}