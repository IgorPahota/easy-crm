import {LOGOUT_SUCCESS} from "./actions";

function loggedOut () {
    return {
        type: LOGOUT_SUCCESS
    }
};

export {loggedOut}