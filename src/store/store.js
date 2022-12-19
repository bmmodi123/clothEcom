import { compose, applyMiddleware, legacy_createStore as createStore } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

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

const middlewares = [loggerMiddleware];

// composing all middleware in one function that is used by dispatch before calling reducer
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);