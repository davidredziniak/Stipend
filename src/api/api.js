const fetch = require("node-fetch");

const loginApi = (tokenId) => {
    const data = {'token_id': tokenId};
    return fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
};

const logoutApi = (tokenId) => {
    const data = {'token_id': tokenId};
    return fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
};

const userApi = (tokenId) => {
    return fetch('/api/user', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
};


const joinTripApi = (tokenId, joinCode) => {
    const data = {'join_code': joinCode};
    return fetch('/api/joinTrip', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
};

const tripIdApi = (tokenId) => {
    return fetch('/api/trip/trip_id={id}', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
};
export {
    loginApi,
    logoutApi,
    joinTripApi,
    userApi
}