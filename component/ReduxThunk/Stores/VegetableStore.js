import { vegetableReducer,historyReducer } from '../Reducers/VegetableReducer'
import { reducerVeg } from '../../Redux/Reducer'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
    vegetable: vegetableReducer,
    cart: reducerVeg,
    history: historyReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['vegetableReducer','reducerVeg'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
