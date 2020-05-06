import axios from 'axios';

export default function authorizationToken(jwt) {
    if (jwt)
        axios.defaults.headers.common["Authorization"] = `${jwt}`;
    else 
        delete axios.defaults.headers.common["Authorization"];

    return jwt;
}