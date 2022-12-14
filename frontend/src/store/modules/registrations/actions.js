export function getRegistrationsRequest() {
  return {
    type: '@registration/GET_REQUEST',
  };
}

export function getRegistrationsSuccess(data) {
  return {
    type: '@registration/GET_SUCCESS',
    payload: {
      data,
    },
  };
}

export function createRegistrationRequest(data) {
  return {
    type: '@registration/CREATE_REQUEST',
    payload: {
      data,
    },
  };
}

export function updateRegistrationRequest(id, data) {
  return {
    type: '@registration/UPDATE_REQUEST',
    payload: {
      id,
      data,
    },
  };
}

export function removeRegistrationRequest(id) {
  return {
    type: '@registration/REMOVE_REQUEST',
    payload: {
      id,
    },
  };
}
