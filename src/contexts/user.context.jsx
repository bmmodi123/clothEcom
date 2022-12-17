import { createContext, useEffect , useReducer} from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// JUST EXTRA THING , YOU CAN DIRECTLY WRITE 'SET_CURRENT_USER' IN TYPE FILED OF SWITCH CASE
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER : 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, // keep the existing state and then override the currentUser
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type} in userReducer`);
  }
}

const InitialState = {
  currentUser: null,
}

export const UserProvider = ({ children }) => {
  // Instead of Using UseState, we can use useReducer <<-- This is the main thing
  // const [currentUser, setCurrentUser] = useState(null);

  // TO USE STATE WITH REDUCER
  const [state, dispatch] = useReducer(userReducer, InitialState);
  const setCurrentUser = (user) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
  }

  
  const { currentUser } = state;
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
