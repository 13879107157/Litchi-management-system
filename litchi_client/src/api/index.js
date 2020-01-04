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
export const reqSearchProducts = (pageNum, pageSize,searchType,searchName ) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]:searchName
  });
