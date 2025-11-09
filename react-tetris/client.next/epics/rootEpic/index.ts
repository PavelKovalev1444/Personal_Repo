// // actions.ts
// // epics.ts
// import {ofType} from 'redux-observable';
// import {ajax} from 'rxjs/ajax';
// import {catchError, map, mergeMap} from 'rxjs/operators';

// // import {FETCH_DATA_REQUEST, fetchDataError, fetchDataSuccess} from './actions';

// export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
// export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
// export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

// export const fetchDataRequest = () => ({
//   type: FETCH_DATA_REQUEST,
// });

// export const fetchDataSuccess = data => ({
//   type: FETCH_DATA_SUCCESS,
//   payload: data,
// });

// export const fetchDataError = error => ({
//   type: FETCH_DATA_ERROR,
//   payload: error,
// });

// export const fetchDataEpic = action$ =>
//   action$.pipe(
//     ofType(FETCH_DATA_REQUEST),
//     mergeMap(() =>
//       ajax.getJSON('https://api.example.com/data').pipe(
//         map(response => fetchDataSuccess(response)),
//         catchError(error => [fetchDataError(error.xhr.response || error.message)])
//       )
//     )
//   );
