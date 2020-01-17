export function getStudentsRequest(search) {
  return {
    type: '@student/GET_REQUEST',
    payload: {
      search,
    },
  };
}

export function getStudentsSuccess(data) {
  return {
    type: '@student/GET_SUCCESS',
    payload: {
      data,
    },
  };
}

export function createStudentRequest(data) {
  return {
    type: '@student/CREATE_REQUEST',
    payload: {
      data,
    },
  };
}

export function updateStudentRequest(id, data) {
  return {
    type: '@student/UPDATE_REQUEST',
    payload: {
      id,
      data,
    },
  };
}

export function removeStudentRequest(id) {
  return {
    type: '@student/REMOVE_REQUEST',
    payload: {
      id,
    },
  };
}
