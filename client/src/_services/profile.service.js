// import config from 'config';
import { authHeader } from '../_helpers';

const apiUrl = 'http://localhost:4000'

export const profileService = {
    getAll,
    update
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/profiles`, requestOptions).then(handleResponse);
}

function update(payload) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(`${apiUrl}/profiles/${payload.id}`, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
