// import config from 'config';
import helpers from '../_helpers';
import { userService }  from './user.service';

const { authHeader, apiUrl } = helpers

export const mediaService = {
    getAll,
    create,
    update,
    remove
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/media`, requestOptions)
        .then(handleResponse);
}

function create(payload) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(`${apiUrl}/media/`, requestOptions)
        .then(handleResponse)
}

function update(payload) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(`${apiUrl}/media/${payload.id}`, requestOptions)
        .then(handleResponse)
}

function remove(payload) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(`${apiUrl}/media/${payload.id}`, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
