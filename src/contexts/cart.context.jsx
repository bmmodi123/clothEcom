import { createContext, useReducer } from 'react';
// import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

const InitialState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled action type: ${type} in cartReducer`);
  }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {

  const[state, dispatch] = useReducer(cartReducer, InitialState);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newcartItems) => {
    const newCartCount = newcartItems.reduce( (total, cartItem) => total + cartItem.quantity, 0 );
    const newCartTotal = newcartItems.reduce( (total, cartItem) => total + cartItem.quantity * cartItem.price, 0 );

    dispatch({ 
      'type': CART_ACTION_TYPES.SET_CART_ITEMS , 
      'payload': { 'cartItems': newcartItems, 'cartCount': newCartCount, 'cartTotal': newCartTotal } 
    });

    // dispatch(
    //   createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
    //   { 'cartItems': newcartItems, 'cartCount': newCartCount, 'cartTotal': newCartTotal }
    // ));

  }

  const addItemToCart = (productToAdd) => {
    const newcartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newcartItems);
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newcartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newcartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newcartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newcartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch({ 'type': CART_ACTION_TYPES.SET_IS_CART_OPEN , 'payload': bool });
    // dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
