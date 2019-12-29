import {combineReducers} from 'redux'

import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './actions-type'



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

export default combineReducers(
    {
        user
    }
)