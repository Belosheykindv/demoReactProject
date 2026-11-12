/* eslint-disable @typescript-eslint/no-explicit-any */
import { beerAPI } from '../Api/apiRequest'

const ADD_BEER = 'ADD_BEER'

const initialState = {
  beer: [],
}
const settingPageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_BEER: {
      return {
        ...state,
        beer: action.beer,
      }
    }
    default:
      return state
  }
}
const addBeerAc = (beer: any) => {
  return { type: ADD_BEER, beer }
}

export const getRandomBeer = () => async (dispatch: any) => {
  const data = await beerAPI.getBeer()
  dispatch(addBeerAc(data))
}

export default settingPageReducer
