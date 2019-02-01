import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views'
// 商品
import  GoodsIndex from '@/views/goods/index'
import  CreateGoods from '@/views/goods/createNewGoods'
import  GoodsList from '@/views/goods/goodsList'
import  GoodsInfo from '@/views/goods/goodsInfo'
import  OnLineGoods from '@/views/goods/onLineGoods'
import  UploadRecord from '@/views/goods/uploadRecord'
import  Evaluate from '@/views/goods/evaluate'
 // import  Classification from '@/views/goods/classification'
import  GoodsDrafts from '@/views/goods/drafts'
import  RecycleBin from '@/views/goods/recycleBin'
import  EditGoods from '@/views/goods/editGoods'
// 订单
import  OrderIndex from '@/views/order/index'
import  OrderList from '@/views/order/orderList'
import  OrderAllList from '@/views/order/orderAllList'
import  CreateFreight from '@/views/order/createFreight'
import  Freight from '@/views/order/freight'
import  FreightTemplate from '@/views/order/freightTemplate'
import  ManagementAddress from '@/views/order/managementAddress'
import  TemplateDetails from '@/views/order/templateDetails'
import  Package from '@/views/order/package'
import  DeliveryCenter from '@/views/order/deliveryCenter'
import  DeliverySon from '@/views/order/deliverySon'
import  Complaint from '@/views/order/complaint'
import  LogisticsReminder from '@/views/order/logisticsReminder'
import  DeliverGoods from '@/views/order/deliverGoods'
import  Shortage from '@/views/order/shortage'
// 售后
import  IndexAfterSale from '@/views/afterSale/index'
import  AfterSale from '@/views/afterSale/afterSale'
import  Refund from '@/views/afterSale/refund'
// 店铺
import  IndexStoreManagement from '@/views/storeManagement/index'
import  StoreManagement from '@/views/storeManagement/storeManagement'
import  EssentialInformation from '@/views/storeManagement/essentialInformation'
import  QualificationInformation from '@/views/storeManagement/qualificationInformation'
import  OrderInvoice from '@/views/storeManagement/orderInvoice'
// 数据中心
import  IndexDataCenter from '@/views/dataCenter/index'
import  BusinessOverview from '@/views/dataCenter/businessOverview'
import  GoodsData from '@/views/dataCenter/goodsData'

import  IndexAccount from '@/views/account/index'
import  LoanAccount from '@/views/account/loanAccount'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect:'/goodsIndex/goodsList',
      children:[
        {path:'goodsIndex',name: 'GoodsIndex',component:GoodsIndex,
          children:[
            {path:'createNewGoods',name: 'CreateGoods',component: CreateGoods},
            {path:'evaluate',name: 'Evaluate',component: Evaluate},
            {path:'drafts',name: 'GoodsDrafts',component: GoodsDrafts},
            {path:'recycleBin',name: 'RecycleBin',component: RecycleBin},
            {path:'editGoods',name: 'EditGoods',component: EditGoods},
            {path:'goodsInfo',name: 'GoodsInfo',component: GoodsInfo},
            {path:'goodsList',name: 'GoodsList',component: GoodsList,redirect:'goodsList/onLineGoods',
              children:[
                {path:'uploadRecord',name: 'UploadRecord',component: UploadRecord},
                {path:'onLineGoods',name: 'OnLineGoods',component: OnLineGoods}
              ]
            },
          ]
        },
        {path:'orderIndex',name: 'OrderIndex',component:OrderIndex,
          children:[
            {path:'orderAllList',name: 'OrderAllList',component: OrderAllList},
            {path:'orderList',name: 'OrderList',component: OrderList},
            {path:'createFreight',name: 'CreateFreight',component:CreateFreight},
            {path:'templateDetails',name: 'TemplateDetails',component: TemplateDetails},
            {path:'package',name: 'Package',component: Package},
            {path:'shortage',name: 'Shortage',component: Shortage},
            {path:'freight',name: 'Freight',component: Freight,redirect:'freight/freightTemplate',
              children:[
                {path:'freightTemplate',name: 'FreightTemplate',component: FreightTemplate},
                {path:'managementAddress',name: 'ManagementAddress',component: ManagementAddress},
              ]
            },
            {path:'deliveryCenter',name: 'DeliveryCenter',component: DeliveryCenter,redirect:'deliveryCenter/deliverySon',
              children:[
                {path:'deliverySon',name: 'DeliverySon',component: DeliverySon},
                {path:'complaint',name: 'Complaint',component: Complaint},
                {path:'logisticsReminder',name: 'LogisticsReminder',component: LogisticsReminder},
                {path:'deliverGoods',name: 'DeliverGoods',component: DeliverGoods},
              ]
            },
          ]
        },
        {path:'indexAfterSale',name: 'IndexAfterSale',component:IndexAfterSale,
          children:[
            {path:'afterSale',name: 'AfterSale',component: AfterSale,redirect:'afterSale/refund',
              children:[
                {path:'refund',name: 'Refund',component: Refund},
              ]
            },
          ]
        },
        {path:'indexStoreManagement',name: 'IndexStoreManagement',component: IndexStoreManagement,
        children:[
          {path:'storeManagement',name: 'StoreManagement',component: StoreManagement,redirect:'storeManagement/essentialInformation',
            children:[
              {path:'essentialInformation',name: 'EssentialInformation',component: EssentialInformation},
              {path:'qualificationInformation',name: 'QualificationInformation',component: QualificationInformation},
            ]
          },
          {path:'orderInvoice',name: 'OrderInvoice',component: OrderInvoice},
        ]},
        {path:'indexDataCenter',name: 'IndexDataCenter',component: IndexDataCenter,
        children:[
          {path:'businessOverview',name: 'BusinessOverview',component: BusinessOverview},
          {path:'goodsData',name: 'GoodsData',component: GoodsData},
        ]
        },
        {path:'indexAccount',name: 'IndexAccount',component: IndexAccount,
        children:[
          {path:'loanAccount',name: 'LoanAccount',component: LoanAccount},
        ]
        },
      ]
    }
  ]
})
