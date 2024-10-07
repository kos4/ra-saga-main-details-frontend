import {ofType} from "redux-observable";
import {catchError, map, mergeMap, of} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";

export const FETCH_SERVICE_ACTION = 'FetchService';
export const FETCH_SERVICE_FULFILLED_ACTION = 'FetchServiceFulfilled';
export const FETCH_SERVICE_REJECTED_ACTION = 'FetchServiceRejected';
export const fetchService = (id) => ({
  type: FETCH_SERVICE_ACTION,
  payload: id
});
export const fetchServiceFulfilled = (payload) => ({
  type: FETCH_SERVICE_FULFILLED_ACTION,
  service: payload,
});

const initialState = {
  service: null,
  error: false,
  loading: false,
};

export const fetchServiceReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_SERVICE_ACTION:
      return {
        ...initialState,
        loading: true,
      }
    case FETCH_SERVICE_FULFILLED_ACTION:
      return {
        ...initialState,
        service: action.service,
      }
    case FETCH_SERVICE_REJECTED_ACTION:
      return {
        ...initialState,
        error: true,
      }
    default:
      return state
  }
}

export const fetchServiceEpic = action$ => {
  return action$.pipe(
    ofType(FETCH_SERVICE_ACTION),
    mergeMap((action) =>
      ajax.getJSON(`${process.env.REACT_APP_API_URL}/api/services/${action.payload}`).pipe(
        map(response => fetchServiceFulfilled(response)),
        catchError(error => of({
          type: FETCH_SERVICE_REJECTED_ACTION
        }))
      )
    )
  )
}