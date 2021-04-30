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

const userBalanceApi = (tokenId, tripId) => {
    return fetch('/api/user/balance?trip_id=' + tripId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
};

const createTripApi = (tokenId, tripData) => {
    const data = {'trip_data': tripData};
    return fetch('/api/trip/create', {
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
    return fetch('/api/trip/invite', {
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
    return fetch('/api/trip/join', {
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
    const data = {"trip_id": tripId}
    return fetch('/api/trip/delete', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
};

const getActivityApi = (tokenId, activityId) => {
    return fetch('/api/activity?activity_id=' + activityId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
};

const setUserPaidApi = (tokenId, activityId, email) => {
    const data = {"activity_id": activityId, "participant_email": email}
    return fetch('/api/activity/setpaid', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
};

const createActivityApi = (tokenId, tripId, activityName, date, time, cost, participants) => {
    const data = {'trip_id': tripId, 'activity_name': activityName, 'activity_cost': cost, 'date': date, 'time': time, 'participants': participants};
    return fetch('/api/activity/create', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
};

export {
    loginApi,
    logoutApi,
    createTripApi,
    inviteToTripApi,
    joinTripApi,
    tripIdApi,
    userApi,
    deleteTripIdApi,
    createActivityApi,
    getActivityApi,
    setUserPaidApi,
    userBalanceApi
};