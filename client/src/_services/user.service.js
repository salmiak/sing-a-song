// import config from 'config';
import { authHeader } from '../_helpers';

const apiUrl = 'http://localhost:4000'

export const userService = {
    login,
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
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
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
