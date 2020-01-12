import { combineReducers } from "redux";

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
  RECEIVE_ROLE_LIST
} from "./actions-type";

function user(state = 0, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...action.data, path: "/" };
    case ERROR_MSG:
      return { ...action.data };
    case RECEIVE_USER:
      return { ...action.data };
    case RESET_USER:
      return action.data;
    default:
      return state;
  }
}

function weather(state = 0, action) {
  switch (action.type) {
    case RECEIVE_WHEATHER:
      return { ...action.data };
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORYS:
      return action.data;
    default:
      return state;
  }
}
function addsuccessmsg(state = 1, action) {
  switch (action.type) {
    case ADDCATEGORY_SUCCESS:
      return action.data;
    default:
      return state;
  }
}
function updatesuccessmsg(state = 1, action) {
  switch (action.type) {
    case UPDATECATEGORY_SUCCESS:
      return action.data;
    default:
      return state;
  }
}
const initproducts = {
  status: 1,
  data: {
    pageNum: null,
    total: null,
    pages: null,
    pageSize: null,
    list: []
  }
};
function products(state = initproducts, action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return { ...action.data };
    default:
      return state;
  }
}
function productStatus(state = 1, action) {
  switch (action.type) {
    case ADDPRODUCT_SUCCESS:
      return action.data;
    case UPDATEPRODUCT_SUCCESS:
      return action.data;
    default:
      return state;
  }
}
function roles(state=[],action){
  switch (action.type) {
    case RECEIVE_ROLE_LIST:
      return action.data
    default:
      return state
  }
}
export default combineReducers({
  user,    //用户
  weather,    //天气
  categories,    //分类列表
  addsuccessmsg,    //添加分类成功消息
  updatesuccessmsg,    //更新分类成功消息
  products,   //商品列表
  productStatus,    //商品上架/下架状态
  roles    //角色列表
});
