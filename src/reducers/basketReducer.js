export function basketReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find((i) => i.id === action.payload.id);
      if (existingItem) {
        return state.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'DELETE_ITEM': {
      return state.filter((i) => i.id !== action.payload.id);
    }

    default:
      return state;
  }
}
