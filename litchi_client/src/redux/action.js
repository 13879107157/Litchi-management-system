import { reqLogin, reqUser, reqWeather, reqCategories , reqAddCategory,reqUpdateCategory} from "../api/index";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_WHEATHER,
  RECEIVE_CATEGORYS,
  ADDCATEGORY_SUCCESS,
  UPDATECATEGORY_SUCCESS
} from "./actions-type";

//授权成功的同步action
const anthSucess = user => ({ type: AUTH_SUCCESS, data: user });
//错误提示信息的同步action
const errorMsg = msg => ({ type: ERROR_MSG, data: msg });
//获取user信息的同步action
const receiveUser = user => ({ type: RECEIVE_USER, data: user });
//重置用户的同步action
const resetUser = msg => ({ type: RESET_USER, data: msg });
//获取天气的同步action
const receiveWheather = weather => ({ type: RECEIVE_WHEATHER, data: weather });
//接收商品分类的同步action
const receiveCategorys = categorys => ({type: RECEIVE_CATEGORYS,data: categorys});
//接收添加成功分类数据
const addCategorySuccess = category=> ({type:ADDCATEGORY_SUCCESS,data:category})
//接收更新成功分类数据
const updateCategorySuccess = category=> ({type:UPDATECATEGORY_SUCCESS,data:category})

/* ---------------------------------------------------------------------------------------------- */

//登录异步action
export const login = (username, password) => {
  //debugger
  if (!username) {
    return errorMsg("必须填写用户名");
  } else if (!password) {
    return errorMsg("密码错误");
  }
  return async dispatch => {
    //debugger
    const response = await reqLogin(username, password);
    //debugger
    //const result = response.data
    //console.log(response)
    if (response.status === 0) {
      dispatch(anthSucess(response));
      //console.log(result)
    } else {
      dispatch(errorMsg(response));
    }
  };
};

export const getUserMessage = () => {
  return async dispatch => {
    const response = await reqUser();
    //const result = response.data
    if (response.status === 0) {
      dispatch(receiveUser(response.data));
    } else {
      dispatch(resetUser(response.msg));
    }
  };
};
//获取天气异步action
export const getWeather = () => {
  return async dispatch => {
    const response = await reqWeather();
    if (response.cityid) {
      dispatch(receiveWheather(response.data[0]));
    }
  };
};

//获取一级分类异步action
export const getCategories = (parentId) => {
  return async dispatch => {
    //debugger

    const response = await reqCategories(parentId);
    const result = response.data;
    if (response.status === 0) {
      dispatch(receiveCategorys(result));
    }
  };
};
//获取添加分类信息
export const getaddCategory = ({parentId,categoryName}) => {
  return async dispatch => {
    const response = await reqAddCategory({parentId,categoryName});
    if (response.status === 0) {
      dispatch(addCategorySuccess(response));
    }
  }
}

//获取更新分类信息
export const getUpdateCategory = ({categoryId, categoryName}) => {
  return async dispatch => {
    const response = await reqUpdateCategory({categoryId, categoryName})
    if(response.status === 0){
      dispatch(updateCategorySuccess(response))
    }
  }
}