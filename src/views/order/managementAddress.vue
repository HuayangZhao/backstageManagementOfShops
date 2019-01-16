<template>
    <div class="managementAddress">
      <h3>
        发货地址管理
        <div>
          <el-button type="danger" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">新增发货地址</el-button>
        </div>
      </h3>
      <div class="address">
        <el-table
          :header-cell-style="{background:'#F3F4F8',fontWeight:'700',color:'#000'}"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="userName"
            align="center"
            label="发件人">
          </el-table-column>
          <el-table-column
            prop="mobile"
            align="center"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            align="center"
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="area"
            align="center"
            label="所在地区">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="详细地址">
          </el-table-column>
          <el-table-column
            align="center"
            label="设为默认发货地址">
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="elasticFrame">
        <el-dialog title="新增发货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="发件人" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在地区" :label-width="formLabelWidth">
              <el-cascader
                placeholder="试试搜索：指南"
                :options="options"
                filterable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.desc" placeholder="不需要重复填写省市区"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" :label-width="formLabelWidth">
              <el-input v-model="form.name" style="width: 200px"></el-input>
              <el-button type="primary">获取验证码</el-button>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input style="width: 100px" v-model="form.name" placeholder="区号"></el-input> -
              <el-input style="width: 120px" v-model="form.name" placeholder="电话"></el-input> -
              <el-input style="width: 120px" v-model="form.name" placeholder="分机号"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>



    </div>
</template>

<script>
    export default {
        name: "managementAddress",
      data(){
          return{
            tableData:[
              { userName:"ksdfksad",
                mobile:"524646354345",
                phoneNumber:"23516545666",
              }
            ],
            dialogFormVisible: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '120px',
            options: [{
                  value: 'zhinan',
                  label: '指南',
                  children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                      value: 'yizhi',
                      label: '一致'
                    }, {
                      value: 'fankui',
                      label: '反馈'
                    }, {
                      value: 'xiaolv',
                      label: '效率'
                    }, {
                      value: 'kekong',
                      label: '可控'
                    }]
                  }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                      value: 'cexiangdaohang',
                      label: '侧向导航'
                    }, {
                      value: 'dingbudaohang',
                      label: '顶部导航'
                    }]
                  }]
                }, {
                  value: 'zujian',
                  label: '组件',
                  children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                      value: 'layout',
                      label: 'Layout 布局'
                    }, {
                      value: 'color',
                      label: 'Color 色彩'
                    }, {
                      value: 'typography',
                      label: 'Typography 字体'
                    }, {
                      value: 'icon',
                      label: 'Icon 图标'
                    }, {
                      value: 'button',
                      label: 'Button 按钮'
                    }]
                  }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                      value: 'radio',
                      label: 'Radio 单选框'
                    }, {
                      value: 'checkbox',
                      label: 'Checkbox 多选框'
                    }, {
                      value: 'input',
                      label: 'Input 输入框'
                    }, {
                      value: 'input-number',
                      label: 'InputNumber 计数器'
                    }, {
                      value: 'select',
                      label: 'Select 选择器'
                    }, {
                      value: 'cascader',
                      label: 'Cascader 级联选择器'
                    }, {
                      value: 'switch',
                      label: 'Switch 开关'
                    }, {
                      value: 'slider',
                      label: 'Slider 滑块'
                    }, {
                      value: 'time-picker',
                      label: 'TimePicker 时间选择器'
                    }, {
                      value: 'date-picker',
                      label: 'DatePicker 日期选择器'
                    }, {
                      value: 'datetime-picker',
                      label: 'DateTimePicker 日期时间选择器'
                    }, {
                      value: 'upload',
                      label: 'Upload 上传'
                    }, {
                      value: 'rate',
                      label: 'Rate 评分'
                    }, {
                      value: 'form',
                      label: 'Form 表单'
                    }]
                  }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                      value: 'table',
                      label: 'Table 表格'
                    }, {
                      value: 'tag',
                      label: 'Tag 标签'
                    }, {
                      value: 'progress',
                      label: 'Progress 进度条'
                    }, {
                      value: 'tree',
                      label: 'Tree 树形控件'
                    }, {
                      value: 'pagination',
                      label: 'Pagination 分页'
                    }, {
                      value: 'badge',
                      label: 'Badge 标记'
                    }]
                  }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                      value: 'alert',
                      label: 'Alert 警告'
                    }, {
                      value: 'loading',
                      label: 'Loading 加载'
                    }, {
                      value: 'message',
                      label: 'Message 消息提示'
                    }, {
                      value: 'message-box',
                      label: 'MessageBox 弹框'
                    }, {
                      value: 'notification',
                      label: 'Notification 通知'
                    }]
                  }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                      value: 'menu',
                      label: 'NavMenu 导航菜单'
                    }, {
                      value: 'tabs',
                      label: 'Tabs 标签页'
                    }, {
                      value: 'breadcrumb',
                      label: 'Breadcrumb 面包屑'
                    }, {
                      value: 'dropdown',
                      label: 'Dropdown 下拉菜单'
                    }, {
                      value: 'steps',
                      label: 'Steps 步骤条'
                    }]
                  }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                      value: 'dialog',
                      label: 'Dialog 对话框'
                    }, {
                      value: 'tooltip',
                      label: 'Tooltip 文字提示'
                    }, {
                      value: 'popover',
                      label: 'Popover 弹出框'
                    }, {
                      value: 'card',
                      label: 'Card 卡片'
                    }, {
                      value: 'carousel',
                      label: 'Carousel 走马灯'
                    }, {
                      value: 'collapse',
                      label: 'Collapse 折叠面板'
                    }]
                  }]
                }, {
                  value: 'ziyuan',
                  label: '资源',
                  children: [{
                    value: 'axure',
                    label: 'Axure Components'
                  }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                  }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                  }]
            }]
          }
      },

    }
</script>

<style scoped lang="less">
  .managementAddress {
    padding-right: 15%;
  }
  h3 {
    position: relative;
    border-left: 3px solid red;
    padding:10px;
    margin: 20px 0;
    >div {
      float: right;
    }
  }
</style>
