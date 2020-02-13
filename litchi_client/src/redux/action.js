import {
  reqLogin,
  reqUser,
  reqWeather,
  reqCategories,
  reqAddCategory,
  reqUpdateCategory,
  reqProducts,
  reqSearchProducts,
  requpdateStatus,
  reqAddProduct,
  reqUpdateProduct,
  reqRoleList,
  reqAddRole,
  reqUpdateRole,
  reqUserList,
  reqAddOrUpdateUser,
  reqDelUser
} from "../api/index";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_WHEATHER,
  RECEIVE_CATEGORYS,
  ADDCATEGORY_SUCCESS,
  UPDATECATEGORY_SUCCESS,
  RECEIVE_PRODUCTS,
  ADDPRODUCT_SUCCESS,
  UPDATEPRODUCT_SUCCESS,
  RECEIVE_ROLE_LIST,
  RECEIVE_USER_LIST,
} from "./actions-type";

import { message } from "antd";

import storage from '../utils/storage'
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
const receiveCategorys = categorys => ({
  type: RECEIVE_CATEGORYS,
  data: categorys
});
//接收添加成功分类数据
const addCategorySuccess = category => ({
  type: ADDCATEGORY_SUCCESS,
  data: category
});
//接收更新成功分类数据
const updateCategorySuccess = category => ({
  type: UPDATECATEGORY_SUCCESS,
  data: category
});
//接收分页商品数据
const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  data: products
});
//添加商品成功status
const addProductSuccess = status => ({
  type: ADDPRODUCT_SUCCESS,
  data: status
});
//更新商品成功status
const updateProductSuccess = status => ({
  type: UPDATEPRODUCT_SUCCESS,
  data: status
});
//接收角色列表
const receiveRoleList = roleList => ({
  type: RECEIVE_ROLE_LIST,
  data: roleList
});
//接收用户列表
const receiveUserList = userList => ({
  type: RECEIVE_USER_LIST,
  data: userList
});
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
      storage.saveUser(response.data)
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
    //debugger
    if (response.code === 0) {
      dispatch(receiveUser(response.data));
    } else {
      message.error('error')
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
export const getCategories = parentId => {
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
export const getaddCategory = ({ parentId, categoryName }) => {
  return async dispatch => {
    const response = await reqAddCategory({ parentId, categoryName });
    if (response.status === 0) {
      dispatch(addCategorySuccess(response));
    }
  };
};

//获取更新分类信息
export const getUpdateCategory = ({ categoryId, categoryName }) => {
  return async dispatch => {
    const response = await reqUpdateCategory({ categoryId, categoryName });
    if (response.status === 0) {
      dispatch(updateCategorySuccess(response));
    }
  };
};

//获取分页商品列表

export const getProducts = (pageNum, pageSize, searchType, searchName) => {
  //getProducts可以获取全部商品也可以按类型获取商品
  //debugger
  return async dispatch => {
    let response;
    //如果有搜索的内容，则按名称或描述来搜索获取商品列表，反之显示所有
    if (searchName) {
      //reqSearchProducts这个接口需要四个值：页码，页数，搜索类型(商品名称/商品描述),搜索内容
      response = await reqSearchProducts(
        pageNum,
        pageSize,
        searchType,
        searchName
      );
    } else {
      //reqProducts这个接口则根据页码和页数来显示所有商品内容
      response = await reqProducts(pageNum, pageSize);
    }
    if (response.status === 0) {
      dispatch(receiveProducts(response));
    }
  };
};
//pageNum = 1默认值为1，否则在第一页进行上架或下架操作就会出现因为没有指定pageNum而获取不到数据
export const getUpdateStatus = (productId, status, pageNum = 1, pageSize) => {
  //debugger
  return async dispatch => {
    const response = await requpdateStatus(productId, status);
    if (response.status === 0) {
      const response = await reqProducts(pageNum, pageSize);
      if (response.status === 0) {
        dispatch(receiveProducts(response));
        message.success("更改成功");
      }
    }
  };
};

//获取添加商品成功状态
export const getAaddProductStatus = (
  categoryId,
  pCategoryId,
  name,
  desc,
  price,
  detail,
  imgs
) => {
  return async dispatch => {
    const response = await reqAddProduct(
      categoryId,
      pCategoryId,
      name,
      desc,
      price,
      detail,
      imgs
    );
    if (response.status === 0) {
      dispatch(addProductSuccess(response.status));
      message.success("添加商品成功");
    } else {
      message.error("添加商品失败");
    }
  };
};

//获取更新商品成功状态
export const getUpdateProductStatus = (
  _id,
  categoryId,
  pCategoryId,
  name,
  desc,
  price,
  detail,
  imgs
) => {
  return async dispatch => {
    const response = await reqUpdateProduct(
      _id,
      categoryId,
      pCategoryId,
      name,
      desc,
      price,
      detail,
      imgs
    );
    if (response.status === 0) {
      dispatch(updateProductSuccess(response.status));
      message.success("修改商品成功");
    } else {
      message.error("修改商品失败");
    }
  };
};

//获取角色列表
export const getRoleList = () => {
  return async dispatch => {
    const response = await reqRoleList();
    if (response.status === 0) {
      dispatch(receiveRoleList(response.data));
    } else {
      message.error("获取失败");
    }
  };
};

//添加角色
export const getAddRoleStatus = roleName => {
  return async dispatch => {
    const response = await reqAddRole(roleName);
    if (response.status === 0) {
      message.success("添加角色成功");
      const result = await reqRoleList();
      if (result.status === 0) {
        dispatch(receiveRoleList(result.data));
      } else {
        message.error("获取角色列表失败");
      }
    }
  };
};

//更新角色权限
export const getUpdateRoleAuthStatus = (_id, menus, auth_time, auth_name) => {
  return async dispatch => {
    const response = await reqUpdateRole(_id, menus, auth_time, auth_name);
    if (response.status === 0) {
      message.success("修改角色权限成功，请重新登录！");
      const result = await reqRoleList();
      if (result.status === 0) {
        dispatch(receiveRoleList(result.data));
      } else {
        message.error("获取角色列表失败");
      }
    }
  };
};
//获取用户列表
export const getUserList = () => {
  return async dispatch => {
    const response = await reqUserList()
    if(response.status === 0 ){
      dispatch(receiveUserList(response.data))
    }
  }
}

export const getAddOrUpdateStatus = (user) => {
  return async dispatch => {
    const response = await reqAddOrUpdateUser(user)
    if(response.status === 0 ){
      message.success("操作成功");
      const response = await reqUserList()
      if(response.status === 0 ){
        dispatch(receiveUserList(response.data))
      }
    } else {
      message.error(response.msg);
    }
  }
}

export const getDelUserStatus = (userId) => {
  return async dispatch => {
    const response = await reqDelUser(userId)
    if(response.status === 0 ){
      message.success("删除成功");
      const response = await reqUserList()
      if(response.status === 0 ){
        dispatch(receiveUserList(response.data))
      }
    } else {
      message.error(response.msg);
    }
  }
}
