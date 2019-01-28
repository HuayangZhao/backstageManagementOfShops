import axios from 'axios'
export const removeImg = (id)=>axios.delete( 'http://192.168.0.129:4006/files/'+ id)
export const postImg = (data)=>axios.post( 'http://192.168.0.129:4006/files/',data)
// 设置请求根路径
axios.defaults.baseURL = 'http://192.168.0.129:8090';
// 获取所有行业分类
export const getAllSelectList = ()=>axios.get( '/category/selectList')
// 通过行业分类获取品牌
export const getGoodsBrandByCategory = (id)=>axios.get( '/brand/getGoodsBrandByCategoryId/'+ id)
// 获取所有的规格
export const getAllSpec = ()=>axios.get( '/productSpecOption/getAll')
// 提交上架
export const postCommodity = (data)=>axios.post( '/product/add',data)
//获取所有商品
export const getAllGoods = ()=>axios.get( '/product/getGoods')
// 根据ID删商品
export const delGoods = (id)=>axios.post( '/product/delete/'+ id,)
// 获取所有上架商品
export const getAllUpperGoods = (status)=>axios.get( '/product/getGoodsByFrameStatus?frameStatus='+ status)
  // 根据分类末ID获取整条级联ID
export const getParentIdsById = (id)=>axios.get( '/category/getParentIdsById/'+ id)
// 编辑商品
export const productEdit = (data)=>axios.post( '/product/edit',data)
  // 下架或者上架单个商品
export const updateGoodsByFrameStatus = (id,status)=>axios.post( '/product/updateGoodsByFrameStatus/'+ id +'/'+ status)
// 根据审核状态查询所有未删除的商品列表
export const getGoodsByReviewStatus = (status)=>axios.get( '/product/getGoodsByReviewStatus?reviewStatus='+ status)
// 根据ID拉取商品信息
export const getOneProduct = (id)=>axios.get( '/product/'+ id)
