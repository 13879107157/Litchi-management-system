import {combineReducers} from 'redux'

import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_WHEATHER} from './actions-type'



function user(state = 0,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...action.data,path:'/'}
        case ERROR_MSG :
            return {...action.data}
        case RECEIVE_USER :
            return {...action.data}
        case RESET_USER:
            return action.data
        default:
            return state
    }
}

function weather(state =0,action){
    switch (action.type) {
        case RECEIVE_WHEATHER:
            return {...action.data}
        default:
            return state
    }
}
export default combineReducers(
    {
        user,
        weather
    }
)