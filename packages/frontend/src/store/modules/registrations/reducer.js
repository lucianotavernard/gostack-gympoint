const initialState = {
  data: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case '@registration/GET_SUCCESS':
      return { ...state, data: action.payload.data };

    case '@registration/REMOVE_REQUEST':
      const { id } = action.payload;

      return {
        ...state,
        data: state.data.filter(registration => registration.id !== id),
      };

    default:
      return state;
  }
}
