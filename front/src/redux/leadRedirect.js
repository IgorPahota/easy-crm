import {LEAD_REDIRECT} from "./actions";

const leadRedirect = (id) => {
    return {
        type: LEAD_REDIRECT,
        idLeadForRedirect: id
    }
}

export {leadRedirect}