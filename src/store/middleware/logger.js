export const loggerMiddleware = (store) => (next) => (action) => {

    if(!action.type) {
        return next(action);
    }

    console.log("Action Type:", action.type);
    console.log("Action Payload", action.payload);
    console.log("Current State before Update:", store.getState());
    next(action);
    console.log("Updated State:", store.getState());
};

export default loggerMiddleware;