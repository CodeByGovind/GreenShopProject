import {ADD_VEGETABLE,REMOVE_VEGETABLE,GET_VEGETABLE} from './Type'

export const addVeg = (veg)=>{
    return {
        type:ADD_VEGETABLE,
        payload:veg
    }
}
export const getVeg = (veglist)=>{
    return {
        type:GET_VEGETABLE,
        payload:veglist
    }
}
export const delVeg = (gId)=>{
    return {
        type:REMOVE_VEGETABLE,
        payload:gId
    }
}