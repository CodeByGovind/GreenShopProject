import { VEGETABLE_LIST, VEGETABLE_ERROR, VEGETABLE_REQUEST }
    from '../Types/VegetableType'
import {HISTORY_ERROR,HISTORY_REQUEST,HISTORY_LIST} from '../Types/VegetableType'
const initialState = {
    list: [],
    loading: false,
    error: ""
}

const initialStateHisory = {
    list: [],
    loading: false,
    error: ""
}

export const vegetableReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case VEGETABLE_REQUEST: return {
            ...state,
            loading: true
        }

        case VEGETABLE_LIST: 
        var data = action.payload
        return {
            ...state,
            loading: false,
            list: data
        }

        case VEGETABLE_ERROR: return {
            ...state,
            loading: false,
            list: [],
            error: action.payload
        }

        default: return state;
    }
}

export const historyReducer = (state = initialStateHisory, action) => {
    switch (action.type) {
        
        case HISTORY_REQUEST: return {
            ...state,
            loading: true
        }

        case HISTORY_LIST: 
        var data = action.payload
        return {
            ...state,
            loading: false,
            list: data
        }

        case HISTORY_ERROR: return {
            ...state,
            loading: false,
            list: [],
            error: action.payload
        }

        default: return state;
    }
}