import { basketReducer, ADDITEM, UPDATEQUANTITY, DELETEITEM, CLEARBASKET, SETBASKET } from './basketReducer';

describe('basketReducer', () => {
  const initialState = [];

  const sampleItem = { id: 1, title: 'Synth', price: 299 };

  it('adds a new item to the basket', () => {
    const action = { type: ADDITEM, payload: sampleItem };
    const result = basketReducer(initialState, action);
    expect(result).toEqual([{ ...sampleItem, quantity: 1 }]);
  });

  it('increments quantity if item already exists', () => {
    const state = [{ ...sampleItem, quantity: 1 }];
    const action = { type: ADDITEM, payload: sampleItem };
    const result = basketReducer(state, action);
    expect(result[0].quantity).toBe(2);
  });

  it('updates quantity to a specific value', () => {
    const state = [{ ...sampleItem, quantity: 2 }];
    const action = { type: UPDATEQUANTITY, payload: { id: 1, quantity: 5 } };
    const result = basketReducer(state, action);
    expect(result[0].quantity).toBe(5);
  });

  it('removes item if quantity is set to 0', () => {
    const state = [{ ...sampleItem, quantity: 2 }];
    const action = { type: UPDATEQUANTITY, payload: { id: 1, quantity: 0 } };
    const result = basketReducer(state, action);
    expect(result).toEqual([]);
  });

  it('deletes item from basket', () => {
    const state = [{ ...sampleItem, quantity: 1 }];
    const action = { type: DELETEITEM, payload: { id: 1 } };
    const result = basketReducer(state, action);
    expect(result).toEqual([]);
  });

  it('clears the basket', () => {
    const state = [{ ...sampleItem, quantity: 1 }];
    const action = { type: CLEARBASKET };
    const result = basketReducer(state, action);
    expect(result).toEqual([]);
  });

  it('sets basket from payload', () => {
    const newBasket = [{ id: 2, title: 'Drum Machine', quantity: 1 }];
    const action = { type: SETBASKET, payload: newBasket };
    const result = basketReducer(initialState, action);
    expect(result).toEqual(newBasket);
  });

  it('returns current state for unknown action', () => {
    const state = [{ ...sampleItem, quantity: 1 }];
    const action = { type: 'UNKNOWN_ACTION' };
    const result = basketReducer(state, action);
    expect(result).toBe(state);
  });
});
