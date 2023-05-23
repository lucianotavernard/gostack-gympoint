const initialState = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST':
      return { ...state, loading: true };

    case '@auth/SIGN_IN_SUCCESS':
      const { token } = action.payload;
      return { ...state, token, signed: true, loading: false };

    case '@auth/SIGN_FAILURE':
      return { ...state, loading: false };

    case '@auth/SIGN_OUT':
      return { ...state, token: null, signed: false };

    default:
      return state;
  }
}
