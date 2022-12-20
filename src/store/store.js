import { compose, applyMiddleware, legacy_createStore as createStore } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore , persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const loggerMiddleware = (store) => (next) => (action) => {

    if(!action.type) {
        return next(action);
    }

    console.log("Action Type:", action.type);
    console.log("Action Payload", action.payload);
    console.log("Current State before Update:", store.getState());
    next(action);
    console.log("Updated State:", store.getState());

};

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["user"],
    // whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [loggerMiddleware];

// composing all middleware in one function that is used by dispatch before calling reducer
const composedEnhancers = compose(applyMiddleware(...middlewares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);

//using persistStore to make the store
export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);

