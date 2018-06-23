import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getResepRequest: ['data'],
  getResepSuccess: ['payload'],
  getResepFailure: null,
  getResepDetailRequest: ['data'],
  getResepDetailSuccess: ['payload'],
  getResepDetailFailure: null
})

export const ResepTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getResep: {data: null, fetching: null, payload: null, error: null},
  getResepDetail: {data: null, fetching: null, payload: null, error: null}
})

/* ------------- Selectors ------------- */

// export const ResepSelectors = {
//   getData: state => state.data
// }

/* ------------- Reducers ------------- */
// GET RESEP
export const getResepRequest = (state, { data }) =>
  state.merge({ ...state, getResep: { fetching: true, data, payload: null } })

export const getResepSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ ...state, getResep: { fetching: false, error: null, payload } })
}

export const getResepFailure = state =>
  state.merge({ ...state, getResep: { fetching: false, error: true, payload: null } })

// GET RESEP DETAIL
export const getResepDetailRequest = (state, { data }) =>
  state.merge({ ...state, getResepDetail: { fetching: true, data, payload: null } })

export const getResepDetailSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ ...state, getResepDetail: { fetching: false, error: null, payload } })
}

export const getResepDetailFailure = state =>
state.merge({ ...state, getResepDetail: { fetching: false, error: true, payload: null } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_RESEP_REQUEST]: getResepRequest,
  [Types.GET_RESEP_SUCCESS]: getResepSuccess,
  [Types.GET_RESEP_FAILURE]: getResepFailure,
  [Types.GET_RESEP_DETAIL_REQUEST]: getResepDetailRequest,
  [Types.GET_RESEP_DETAIL_SUCCESS]: getResepDetailSuccess,
  [Types.GET_RESEP_DETAIL_FAILURE]: getResepDetailFailure
})
