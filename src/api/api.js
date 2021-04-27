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

const createTripApi = (tokenId, tripData) => {
    const data = {'trip_data': tripData};
    return fetch('/api/createTrip', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
};

const inviteToTripApi = (tokenId, emails, joinCode) => {
    const data = {'invited_emails': emails,
                  'join_code': joinCode};
    return fetch('/api/trips/invite', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

const tripIdApi = (tokenId, tripId) => {
    return fetch('/api/trip?tripId=' + tripId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
};
const deleteTripIdApi = (tokenId, tripId) => {
    return fetch('/api/trip?deletetripId=' + tripId, {
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
    createTripApi,
    inviteToTripApi,
    joinTripApi,
    tripIdApi,
    userApi
};