import {reqLogin} from '../api/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './actions-type'

const anthSucess = (user) => ({type:AUTH_SUCCESS,data:user})
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})



export const login = (username,password) => {
    debugger
    
    if(!username){
        return errorMsg('必须填写用户名')
    } else if (!password){
        return errorMsg('密码错误')
    }
    return async dispatch => {
        //debugger
        const response = await reqLogin(username,password)
        //debugger
        const result = response.data
        //console.log(result)
        if(response.status === 0 ){
            dispatch(anthSucess(response))
            //console.log(result)
        } else {
            dispatch(errorMsg(response.msg))
        }
    }
}
