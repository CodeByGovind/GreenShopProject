import { ADD_VEGETABLE, REMOVE_VEGETABLE, GET_VEGETABLE } from './Type'

const initialState = {
    vegetables: []
}

export const reducerVeg = (state = initialState, action) => {
    switch (action.type) {

        case ADD_VEGETABLE:
            const veg = action.payload
            return {
                ...state,
                vegetables: [...state.vegetables,
                {
                    id:veg.id,
                    item: veg.item,
                    price: veg.price,
                    quantity: veg.quantity
                }]
            }
        case GET_VEGETABLE:
            return {
                ...state,
                vegetables: action.payload
            }
        case REMOVE_VEGETABLE:
            return {
                ...state,
                vegetables: state.vegetables.filter(item => item.id !== action.payload)
            }

        default: return state;
    }
}