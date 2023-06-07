import { VEGETABLE_LIST, VEGETABLE_ERROR, VEGETABLE_REQUEST }
    from '../Types/VegetableType'
import { PLACEORDER_DONE, PLACEORDER_REQUEST, PLACEORDER_ERROR }
    from '../Types/VegetableType'
import {HISTORY_ERROR,HISTORY_REQUEST,HISTORY_LIST} from '../Types/VegetableType'
import axios from 'axios'
const historyRequest = () => {
    return {
        type: HISTORY_REQUEST
    }
}
const historySuccess = (list) => {
    return {
        type: HISTORY_LIST,
        payload: list
    }
}
const historyError = (error) => {
    return {
        type: HISTORY_ERROR,
        payload: error
    }
}
export const historyList = (number) => {
    return function (dispatch) {
        dispatch(historyRequest())
        let params = {
            "customer_id": number
        }
        axios.post("http://tomatoman.pythonanywhere.com/items/order_api/mobile/", params)
            .then((response) => {
                console.log("Response:->",response.data)
                const data = response.data
                dispatch(historySuccess(data))
            })
            .catch((error) => {
                console.log(error)
                dispatch(historyError(error))
            })
    }
}
//----------------------------
const placeOrderRequest = () => {
    return {
        type: PLACEORDER_REQUEST
    }
}
const placeOrderSuccess = (details) => {
    return {
        type: PLACEORDER_DONE,
        payload: details
    }
}
const placeOrderError = (error) => {
    return {
        type: PLACEORDER_ERROR,
        payload: error
    }
}
export const placeOrder = (arrItems, totalAmt) => {
    return function (dispatch) {
        dispatch(placeOrderRequest())
        let params = {
            "order": {
                "customer": "7878121201",
                "date": "2021-01-29T06:00:11Z",
                "payment_mode": "Pay On Delivery",
                "payment_status": "Received",
                "total_amount": totalAmt
            },
            "items": arrItems
        }

        axios.post("http://tomatoman.pythonanywhere.com/items/place_order/", params)
            .then((response) => {
                console.log(response.data)
                const data = response.data
                dispatch(placeOrderSuccess(data))
            })
            .catch((error) => {
                console.log(error)
                dispatch(placeOrderError(error))
            })
    }
}
//---------------------------------------------
const vegRequest = () => {
    return {
        type: VEGETABLE_REQUEST
    }
}
const vegSuccess = (list) => {
    return {
        type: VEGETABLE_LIST,
        payload: list
    }
}
const vegError = (error) => {
    return {
        type: VEGETABLE_ERROR,
        payload: error
    }
}

export const Vegetables = () => {
    return function (dispatch) {
        dispatch(vegRequest())
        axios.get("http://tomatoman.pythonanywhere.com/items/items/")
            .then((response) => {
                // console.log(response.data)
                const data = response.data.map((cat) => ({
                    ...cat,
                    id: Math.random(),
                    quantity: 1
                }))
                dispatch(vegSuccess(data))
            })
            .catch((error) => {
                console.log(error)
                dispatch(vegError(error))
            })
    }
}