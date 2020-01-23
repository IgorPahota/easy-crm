import {LOGIN_SUCCESS} from "./actions";

function loggedIn (data) {
    return {
        type: LOGIN_SUCCESS,
        username: data[0],
        email: data[1],
        id: data[2]
    }
}

export {loggedIn}