import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.0.29:8091';
axios.timeout = 5000;
// 获取所有订单列表  查询
export const getAllOrders = (data)=>axios.get( '/order/getOrders',{
  params:data
});

