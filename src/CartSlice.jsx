import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
  },

  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    removeItem: (state, action) => {
      const name =
        typeof action.payload === 'string'
          ? action.payload
          : action.payload.name;

      state.items = state.items.filter(
        (item) => item.name !== name
      );
    },

    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find(
        (item) => item.name === name
      );

      if (item) {
        item.quantity = amount;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity
} = CartSlice.actions;

export default CartSlice.reducer;
