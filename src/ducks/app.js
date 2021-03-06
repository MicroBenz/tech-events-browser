import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {createReducer, Creator} from './helper'

export const FETCH_EVENTS = 'FETCH_EVENTS'
export const SET_EVENTS = 'SET_EVENTS'
export const SET_SEARCH = 'SET_SEARCH'
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const TOGGLE_TAG_FILTER = 'TOGGLE_TAG_FILTER'
export const TOGGLE_FAVORITE_FILTER = 'TOGGLE_FAVORITE_FILTER'

export const fetchEvents = Creator(FETCH_EVENTS)
export const setEvents = Creator(SET_EVENTS)
export const setSearch = Creator(SET_SEARCH)
export const toggleFavorite = Creator(TOGGLE_FAVORITE)
export const toggleTagFilter = Creator(TOGGLE_TAG_FILTER)
export const toggleFavoriteFilter = Creator(TOGGLE_FAVORITE_FILTER)

// prettier-ignore
const endpoint = 'https://thaiprogrammer-tech-events-calendar.spacet.me/calendar.json'

export function* fetchEventsSaga() {
  try {
    const {data} = yield call(axios.get, endpoint)
    yield put(setEvents(data))
  } catch (err) {
    // TODO: Handle FETCH_EVENTS' Error
    console.warn('FETCH_EVENTS Error', err)
  }
}

export function* appWatcherSaga() {
  yield takeEvery(FETCH_EVENTS, fetchEventsSaga)
}

const initial = {
  events: [],
  favorites: {},
  tagFilters: {},
  filterFavorites: false,
  search: '',
}

export default createReducer(initial, state => ({
  [SET_EVENTS]: events => ({...state, events}),
  [SET_SEARCH]: search => ({...state, search}),
  [TOGGLE_FAVORITE_FILTER]: () => ({
    ...state,
    filterFavorites: !state.filterFavorites,
  }),
  [TOGGLE_TAG_FILTER]: tag => ({
    ...state,
    tagFilters: {
      ...state.tagFilters,
      [tag]: !state.tagFilters[tag],
    },
  }),
  [TOGGLE_FAVORITE]: id => ({
    ...state,
    favorites: {
      ...state.favorites,
      [id]: !state.favorites[id],
    },
  }),
}))
