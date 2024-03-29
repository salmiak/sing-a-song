// import config from 'config';
import helpers from "../_helpers";
import { userService } from "./user.service";

const { authHeader, apiUrl } = helpers;

export const profileService = {
  getAll,
  update,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/profiles`, requestOptions).then(handleResponse);
}

function update(payload) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(payload),
  };

  return fetch(`${apiUrl}/profiles/${payload.id}`, requestOptions).then(
    handleResponse
  );
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
