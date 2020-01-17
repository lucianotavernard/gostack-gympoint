const initialState = {
  data: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case '@helpOrder/GET_SUCCESS':
      return { ...state, data: action.payload.data };

    case '@helpOrder/UPDATE_REQUEST':
      const { id } = action.payload;

      return {
        ...state,
        data: state.data.filter(helpOrder => helpOrder.id !== id),
      };

    default:
      return state;
  }
}
