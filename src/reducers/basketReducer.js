export const ADDITEM = 'ADD_ITEM';
export const DELETEITEM = 'DELETE_ITEM';
export const UPDATEQUANTITY = 'UPDATE_QUANTITY';
export const CLEARCART = 'CLEAR_CART';
export const SETCART = 'SET_CART';

export function basketReducer(state, action) {
  switch (action.type) {
    case ADDITEM: {
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

    case DELETEITEM: {
      return state.filter((i) => i.id !== action.payload.id);
    }

    case UPDATEQUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((i) => i.id !== id);
      }

      return state.map((i) => i.id === id ? { ...i, quantity } : i);
    }

    case CLEARCART:
      return [];

    case SETCART:
      return action.payload;

    default:
      return state;
  }
}

