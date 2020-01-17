const initialState = {
  data: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case '@plan/GET_SUCCESS':
      return { ...state, data: action.payload.data };

    case '@plan/REMOVE_REQUEST':
      const { id } = action.payload;

      return {
        ...state,
        data: state.data.filter(plan => plan.id !== id),
      };

    default:
      return state;
  }
}
