import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views'
import  NewGoods from '@/views/goods/publishNewGoods'
import  CreateGoods from '@/views/goods/createNewGoods'
import  GoodsList from '@/views/goods/goodsList'
import  OnLineGoods from '@/views/goods/onLineGoods'
import  UploadRecord from '@/views/goods/uploadRecord'
import  GoodsDrafts from '@/views/goods/drafts'
import  RecycleBin from '@/views/goods/recycleBin'
import  Evaluate from '@/views/goods/evaluate'
import  OrderList from '@/views/order/orderList'
import  Freight from '@/views/order/freight'
import  FreightTemplate from '@/views/order/freightTemplate'
import  TemplateDetails from '@/views/order/templateDetails'
import  ManagementAddress from '@/views/order/managementAddress'
import  Package from '@/views/order/package'
import  DeliveryCenter from '@/views/order/deliveryCenter'
import  DeliverySon from '@/views/order/deliverySon'
import  Complaint from '@/views/order/complaint'
import  LogisticsReminder from '@/views/order/logisticsReminder'
import  DeliverGoods from '@/views/order/deliverGoods'
import  Shortage from '@/views/order/shortage'
import  AfterSale from '@/views/afterSale/index'
import  Refund from '@/views/afterSale/refund'
import  StoreManagement from '@/views/storeManagement/index'
import  EssentialInformation from '@/views/storeManagement/essentialInformation'
import  QualificationInformation from '@/views/storeManagement/qualificationInformation'
import  OrderInvoice from '@/views/storeManagement/orderInvoice'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {path:'publishNewGoods',name: 'NewGoods',component: NewGoods},
        {path:'createNewGoods',name: 'CreateGoods',component: CreateGoods},
        {path:'drafts',name: 'GoodsDrafts',component: GoodsDrafts},
        {path:'recycleBin',name: 'RecycleBin',component: RecycleBin},
        {path:'evaluate',name: 'Evaluate',component: Evaluate},
        {path:'orderList',name: 'OrderList',component: OrderList},
        {path:'templateDetails',name: 'TemplateDetails',component: TemplateDetails},
        {path:'package',name: 'Package',component: Package},
        {path:'shortage',name: 'Shortage',component: Shortage},
        {path:'orderInvoice',name: 'OrderInvoice',component: OrderInvoice},
        {path:'storeManagement',name: 'StoreManagement',component: StoreManagement,redirect:'storeManagement/essentialInformation',
          children:[
            {path:'essentialInformation',name: 'EssentialInformation',component: EssentialInformation},
            {path:'qualificationInformation',name: 'QualificationInformation',component: QualificationInformation},
          ]
        },
        {path:'afterSale',name: 'AfterSale',component: AfterSale,redirect:'afterSale/refund',
          children:[
            {path:'refund',name: 'Refund',component: Refund},
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
        {path:'freight',name: 'Freight',component: Freight,redirect:'freight/freightTemplate',
          children:[
            {path:'freightTemplate',name: 'FreightTemplate',component: FreightTemplate},
            {path:'managementAddress',name: 'ManagementAddress',component: ManagementAddress},
          ]
        },
        {path:'goodsList',name: 'GoodsList',component: GoodsList,redirect:'goodsList/onLineGoods',
        children:[
          {path:'uploadRecord',name: 'UploadRecord',component: UploadRecord},
          {path:'onLineGoods',name: 'OnLineGoods',component: OnLineGoods}
        ]
      
        },
      ]
    }
  ]
})
