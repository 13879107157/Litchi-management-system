import ajax from "./ajax";

//用户登录
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

//获取用户信息
export const reqUser = () => ajax("/user", "GET");

//获取天气
export const reqWeather = () =>
  ajax(
    "https://www.tianqiapi.com/api/?version=v1&cityid=101240101&appid=77551823APPID&appsecret=pmRk985U",
    "GET"
  );

//获取一级/二级分类的列表
export const reqCategories = parentId =>
  ajax("/manage/category/list", { parentId });

//添加分类
export const reqAddCategory = ({ categoryName, parentId }) =>
  ajax("/manage/category/add", { categoryName, parentId }, "POST");

//更新分类
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });

//根据商品描述或商品名称来搜索商品分页列表
export const reqSearchProducts = (pageNum, pageSize, searchType, searchName) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName
  });

//根据分类ID获取分类
export const reqCategory = categoryId =>
  ajax("/manage/category/info", { categoryId });

//更新商品状态 上架/下架
export const requpdateStatus = (productId, status) =>
  ajax("/manage/product/updateStatus", { productId, status }, "POST");

//删除图片
export const reqDeleteImg = name =>
  ajax("/manage/img/delete", { name }, "POST");

//添加商品
export const reqAddProduct = (
  categoryId,
  pCategoryId,
  name,
  desc,
  price,
  detail,
  imgs
) =>
  ajax(
    "/manage/product/add",
    { categoryId, pCategoryId, name, desc, price, detail, imgs },
    "POST"
  );
//更新商品
export const reqUpdateProduct = (
  _id,
  categoryId,
  pCategoryId,
  name,
  desc,
  price,
  detail,
  imgs
) =>
  ajax(
    "/manage/product/update",
    { _id, categoryId, pCategoryId, name, desc, price, detail, imgs },
    "POST"
  );
//添加角色
export const reqAddRole = roleName =>
  ajax("/manage/role/add", { roleName }, "POST");
//获取角色列表
export const reqRoleList = () => ajax("/manage/role/list");
//更新角色
export const reqUpdateRole = (_id, menus, auth_time, auth_name) =>
  ajax("/manage/role/update", { _id, menus, auth_time, auth_name }, "POST");
//获取用户列表
export const reqUserList = () => ajax("/manage/user/list");
//添加或更新用户
export const reqAddOrUpdateUser = user =>
  ajax("/manage/user/" + (user.password ? "add" : "update"),user,'POST');
//删除用户
export const reqDelUser = (userId) => ajax("/manage/user/delete" , {userId} ,"POST")