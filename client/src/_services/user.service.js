// import config from 'config';
import helpers from '@/_helpers';

const { authHeader, apiUrl } = helpers

export const userService = {
    login,
    forgotPassword,
    logout,
    register,
    update,
    getAll
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.jwtToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                startRefreshTokenTimer();
            }
            return user;
        });
}

function refreshToken() {

  if (process.env !== 'production')
    return console.log('Not in production, not using refresh token') // eslint-disable-line no-console

    const requestOptions = {
        method: 'POST'
    };

    return fetch(`${apiUrl}/users/refresh-token`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.jwtToken) {
                localStorage.setItem('user', JSON.stringify(user));
                startRefreshTokenTimer();
            }
            return user;
        });
}

refreshToken();

function forgotPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch(`${apiUrl}/users/forgot-password`, requestOptions)
        .then(handleResponse)
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    stopRefreshTokenTimer();
}

function register(payload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(`${apiUrl}/users/register`, requestOptions)
        .then(handleResponse);
}

function update(payload) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(`${apiUrl}/users/${payload.id}`, requestOptions)
        .then(handleResponse)
        .then(user => {
          let userCookie = JSON.parse(localStorage.getItem('user'));
          Object.assign(userCookie, user)
          localStorage.setItem('user', JSON.stringify(userCookie));
        });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const user = JSON.parse(localStorage.getItem('user'));
    const jwtToken = JSON.parse(atob(user.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
