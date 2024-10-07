import {ofType} from "redux-observable";
import {catchError, map, mergeMap, of} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";

export const FETCH_SERVICES_ACTION = 'FetchServices';
export const FETCH_SERVICES_FULFILLED_ACTION = 'FetchServicesFulfilled';
export const FETCH_SERVICES_REJECTED_ACTION = 'FetchServicesRejected';
export const fetchServices = () => ({
  type: FETCH_SERVICES_ACTION,
});
export const fetchServicesFulfilled = (payload) => ({
  type: FETCH_SERVICES_FULFILLED_ACTION,
  services: payload,
});
const initialState = {
  services: [],
  error: false,
  loading: false,
};
export const fetchServicesEpic = action$ => {
  return action$.pipe(
    ofType(FETCH_SERVICES_ACTION),
    mergeMap(() =>
      ajax.getJSON(`${process.env.REACT_APP_API_URL}/api/services`).pipe(
        map(response => fetchServicesFulfilled(response)),
        catchError(error => of({
          type: FETCH_SERVICES_REJECTED_ACTION
        }))
      )
    )
  )
}

export const fetchServicesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_SERVICES_ACTION:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case FETCH_SERVICES_FULFILLED_ACTION:
      return {
        error: false,
        services: action.services,
        loading: false,
      }
    case FETCH_SERVICES_REJECTED_ACTION:
      return {
        services: [],
        error: true,
        loading: false,
      }
    default:
      return state
  }
}