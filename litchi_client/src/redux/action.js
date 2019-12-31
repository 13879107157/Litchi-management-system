import {reqLogin,reqUser,reqWeather} from '../api/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_WHEATHER
} from './actions-type'
//授权成功的同步action
const anthSucess = (user) => ({type:AUTH_SUCCESS,data:user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
//获取user信息
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
//重置用户
const resetUser = (msg) => ({type:RESET_USER,data:msg})
const receiveWheather = (weather) => ({type:RECEIVE_WHEATHER,data:weather})
export const login = (username,password) => {
    //debugger
    if(!username){
        return errorMsg('必须填写用户名')
    } else if (!password){
        return errorMsg('密码错误')
    }
    return async dispatch => {
        //debugger
        const response = await reqLogin(username,password)
        //debugger
        //const result = response.data
        //console.log(response)
        if(response.status === 0 ){
            dispatch(anthSucess(response))
            //console.log(result)
        } else {
            dispatch(errorMsg(response))
        }
    }
}

export const getUserMessage = () => {
    return async dispatch => {
        const response = await reqUser()
        //const result = response.data
        if(response.status === 0){
            dispatch(receiveUser(response.data))
        } else {
            dispatch(resetUser(response.msg))
        }
        
    }
}

export const getWeather = () => {
    return async dispatch => {
        const response = await reqWeather()
        if(response.cityid){
            dispatch(receiveWheather(response.data[0]))   
        }
    }
}