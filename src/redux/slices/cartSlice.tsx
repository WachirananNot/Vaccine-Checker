import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  cartItems: any;
  apply: boolean;
}

const initialState: cartState = {
  cartItems: [
    {
      id: 1,
      itemName: "Shirt",
      category: "Clothing",
      amount: 1,
      price: 590,
    },
    {
      id: 2,
      itemName: "Watch",
      category: "Accessories",
      amount: 3,
      price: 790,
    },
    {
      id: 3,
      itemName: "Microwave",
      category: "Electronics",
      amount: 1,
      price: 1590,
    },
  ],
  apply: false,
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    plusItem: (state, action) => {
      state.cartItems[action.payload].amount++;
    },
    minusItem: (state, action) => {
      if (state.cartItems[action.payload].amount > 0) {
        state.cartItems[action.payload].amount--;
      }
    },
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    setApply:(state,action)=>{
      state.apply = action.payload;
    }
  },
});

export const {setApply, plusItem,minusItem,addItem } = cartSlice.actions;
export default cartSlice;
