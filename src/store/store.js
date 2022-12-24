import { compose, applyMiddleware, legacy_createStore as createStore } from "redux";

import { rootReducer } from "./root-reducer";
import { persistStore , persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";
// import loggerMiddleware from "./middleware/logger";
import thunk from "redux-thunk";


const persistConfig = {
    key: "root",
    storage: storage,
    // blacklist: ["user"],
    whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && logger , thunk].filter(Boolean);

const composeUpgrade = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// composing all middleware in one function that is used by dispatch before calling reducer
const composedEnhancers = composeUpgrade(applyMiddleware(...middlewares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);

//using persistStore to make the store
export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);

