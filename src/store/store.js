import {combineEpics, createEpicMiddleware} from "redux-observable";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {fetchServicesEpic, fetchServicesReducer} from "./storeServices";
import {fetchServiceEpic, fetchServiceReducer} from "./storeService";

const epics = combineEpics(
  fetchServicesEpic,
  fetchServiceEpic
);

const rootReducer = combineReducers({
  servicesState: fetchServicesReducer,
  serviceState: fetchServiceReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configStore = () => {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(epicMiddleware))
  )
  epicMiddleware.run(epics);

  return store;
}