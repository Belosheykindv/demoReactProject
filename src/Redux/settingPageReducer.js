import { beerAPI } from "../Api/apiRequest";
const ADD_BEER = 'ADD_BEER'

let initialState = {
    beer: []
}
const settingPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BEER: {
            return {
                ...state, beer: action.beer,
            };
        }
        default: return state;
    }
}
const addBeerAc = (beer) => {
    return { type: ADD_BEER, beer }
}
export const getRandomBeer = () => async (dispatch) => {
    const data = await beerAPI.getBeer()
    dispatch(addBeerAc(data));
}
export default settingPageReducer