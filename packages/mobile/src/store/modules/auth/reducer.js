const initialState = {
  user: null,
  signed: false,
  loading: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST':
      return { ...state, loading: true };

    case '@auth/SIGN_IN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        signed: true,
      };

    case '@auth/SIGN_IN_FAILURE':
      return { ...state, loading: false };

    default:
      return state;
  }
}
