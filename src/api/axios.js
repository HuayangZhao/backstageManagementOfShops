import axios from 'axios'
// 设置请求根路径
axios.defaults.baseURL = 'http://192.168.0.29:8090';
// 获取所有行业分类
export const getAllSelectList = ()=>axios.get( '/category/selectList')
// 通过行业分类获取品牌
export const getGoodsBrandByCategory = (id)=>axios.get( '/brand/getGoodsBrandByCategoryId/'+ id)
