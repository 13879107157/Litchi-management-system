import {combineReducers} from 'redux'

import {AUTH_SUCCESS,ERROR_MSG} from './actions-type'



function user(state = 0,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...action.data,path:'/'}
        case ERROR_MSG :
            return action.data
        default:
            return state
    }
}

export default combineReducers(
    {
        user
    }
)