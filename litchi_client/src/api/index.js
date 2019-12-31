import ajax from "./ajax";

export const reqLogin = (username, password) => ajax('/login', {username, password},'POST')
export const reqUser = () => ajax('/user','GET')
export const reqWeather = () =>ajax('https://www.tianqiapi.com/api/?version=v1&cityid=101240101&appid=77551823APPID&appsecret=pmRk985U','GET')