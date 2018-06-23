import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getBahanRequest: ['data'],
  getBahanSuccess: ['payload'],
  getBahanFailure: null
})

export const BahanTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getBahan: {data: null, fetching: null, payload: null, error: null}
})

/* ------------- Selectors ------------- */

// export const BahanSelectors = {
//   getData: state => state.data
// }

/* ------------- Reducers ------------- */

// request the data from an api
export const getBahanRequest = (state, { data }) => {
  return state.merge({ ...state, getBahan: { fetching: true, data, payload: null } })
}

// successful api lookup
export const getBahanSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ ...state, getBahan: { fetching: false, error: null, payload } })
}

// Something went wrong somewhere.
export const getBahanFailure = state => {
  return  state.merge({ ...state, getBahan: { fetching: false, error: true, payload: null } })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BAHAN_REQUEST]: getBahanRequest,
  [Types.GET_BAHAN_SUCCESS]: getBahanSuccess,
  [Types.GET_BAHAN_FAILURE]: getBahanFailure
})
