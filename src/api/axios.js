import axios from 'axios'
export const removeImg = (id)=>axios.delete( 'http://192.168.0.129:4006/files/'+ id)
export const postImg = (data)=>axios.post( 'http://192.168.0.129:4006/files/',data)
// 设置请求根路径
axios.defaults.baseURL = 'http://192.168.0.29:8090';
// 获取所有行业分类
export const getAllSelectList = ()=>axios.get( '/category/selectList')
// 通过行业分类获取品牌
export const getGoodsBrandByCategory = (id)=>axios.get( '/brand/getGoodsBrandByCategoryId/'+ id)
// 获取所有的规格
export const getAllSpec = ()=>axios.get( '/productSpecOption/getAll')
// 提交上架 分表提交
// 1.商品表
export const postCommodity = (data)=>axios.post( '/product/add',data)
// 2.提交轮播图
export const postGoodsImgs = (data)=>axios.post( '/tbProductPicture',data)
// 3.提交规格
export const postSpecImgs = (data)=>axios.post( '/productSpecOption/add',data)
