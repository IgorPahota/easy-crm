import {LOGIN_SUCCESS} from "./actions";

function loggedIn (data) {
    return {
        type: LOGIN_SUCCESS,
        // нельзя так
        username: data[0],
        email: data[1],
        id: data[2],
        contacts: data[3],
        userType: data[4]
    }
}

export {loggedIn}
