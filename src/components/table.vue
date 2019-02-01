<template>
  <div class="table-component">
    <el-table
      ref="table"
      fit
      :size="tableSize"
      style="width: 100%"
      :data="frontendPagination?data:customData"
      :cellStyle="cellStyle"
      :headerCellStyle="headerCellStyle"
      :stripe="stripe"
      border
      @selection-change="selectionChanged"
      @select="handleSelection"
      @select-all="handleSelectionAll"
      @row-click="rowClick">
      <template v-for="(column,index) in columns">
        <el-table-column :prop="column.index"
                         v-if="!column.disabled&&column.index"
                         :type="column.type"
                         align="center"
                         :key="index+'a'"
                         :formatter="column.formatter"
                         :selectable="column.selectable"
                         :width="column.width"
                         :min-width="column.minWidth"
                         :fixed="column.fixed"
                         :label="column.label"
                         :column-key="column.columnKey"
                         :index="column.$index">
        </el-table-column>
        <el-table-column :prop="column.index"
                         v-if="!column.disabled&&(column.slot||column.buttons)"
                         :key="index+'b'"
                         :formatter="column.formatter"
                         :selectable="column.selectable"
                         :width="column.width"
                         :min-width="column.minWidth"
                         :fixed="column.fixed"
                         align="center"
                         :label="column.label"
                         :column-key="column.columnKey"
                         :index="column.$index">
          <template slot-scope="scope">
            <!--有buttons按钮操作-->
            <template v-if="column.buttons">
              <template v-for="(button,index) in column.buttons">
                <template v-if="!getVisible(button.hidden,data[scope.$index])">
                  <!--button的类型是弹框-->
                  <template v-if="button.type==='popover'">
                    <el-popover v-model="scope.visible"
                                :ref="'popover'+index+scope.$index"
                                :key="index+'c'"
                                :disabled="getDisabled(button.disabled,data[scope.$index])"
                                :placement="button.placement||'top'">
                      <p>{{button.popoverContent||'确认删除吗'}}</p>
                      <div class="d-flex justify-content-end">
                        <el-button type="default"
                                   @click="hidePopover('popover'+index+scope.$index)">取消</el-button>
                        <el-button type="primary"
                                   @click="closePopover('popover'+index+scope.$index,button,data[scope.$index],scope.$index)">
                          确认
                        </el-button>
                      </div>
                    </el-popover>
                    <el-button :disabled="getDisabled(button.disabled,data[scope.$index])"
                               :key="index+'cc'"
                               v-popover="'popover'+index+scope.$index"
                               :class="button.class"
                               :type="button.type"
                               :size="button.size || 'small '"
                               :plain="button.plain || false">
                      {{button.text}}
                    </el-button>
                  </template>
                  <!--普通可点击按钮-->
                  <template v-else>
                    <el-button v-if="!getVisible(button.hidden, data[scope.$index])"
                               v-bind:class="button.class"
                               :disabled="getDisabled(button.disabled,data[scope.$index])"
                               :type="button.type"
                               :size="button.size || 'small '"
                               :plain="button.plain || false"
                               :key="index+'c'"
                               @click="button.click(data[scope.$index],scope.$index)||null">{{button.text}}
                    </el-button>
                  </template>
                </template>
              </template>
            </template>
            <!--放自定义插槽内容-->
            <template v-if="column.slot">
              <slot :name="column.slot" v-bind:$index="scope.$index" v-bind:row="data[scope.$index]"></slot>
            </template>
          </template>
        </el-table-column>
        <!--type类型-->
        <el-table-column
          :key="index+'d'"
          :selectable="column.selectable"
          v-if="!column.disabled&&column.type"
          :type="column.type"
          align="center"
          :width="column.width"
          :label="column.label">
          <!--TODO: Open List table I don't know how to do it.-->
          <!--展开列表这里面的模板没想到怎么渲染-->
          <!--<template slot-scope="props" v-if="!column.disabled&&column.type === 'expand'">-->
            <!--<el-form label-position="left" inline class="demo-table-expand">-->
              <!--<el-form-item label="商品名称">-->
                <!--<span>{{ props.row.name }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="所属店铺">-->
                <!--<span>{{ props.row.shop }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="商品 ID">-->
                <!--<span>{{ props.row.id }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="店铺 ID">-->
                <!--<span>{{ props.row.shopId }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="商品分类">-->
                <!--<span>{{ props.row.category }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="店铺地址">-->
                <!--<span>{{ props.row.address }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="商品描述">-->
                <!--<span>{{ props.row.desc }}</span>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          <!--</template>-->
        </el-table-column>
      </template>
    </el-table>
    <!--分页展示-->
    <el-pagination
      @current-change="pageChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      @size-change="sizeChange"
      :page-sizes="pageSizes"
      :page-size="size"
      :current-page="currentPage"
      v-show="total != null && total >0"
      background
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  /**
   * @compoentName TableComponent
   * @description 基于el-table的带分页的简单table，分页使用时直接在TableComponent的Props中传入el-pagination的Props即可
   * {
   *    label: String 表头标题
   *    index: String 当前列数据对应的key值 row[index]
   *    disabled: Boolean 是否显示当前列
   *    buttons: [
   *      {
   *        text: String button内的显示文字
   *        disabled: Function<T>:Boolean button是否禁用
   *        class: String button的样式class（多个用空格分隔）
   *        click: Function<T> button的点击事件
   *      }
   *    ]
   *    slot: String 自定义列的插槽名
   *    className: String 列的额外class name（多个用空格分隔）
   * }
   */
  export default {
    "name": "TableComponent",
    // TODO: perfect table props
    "props": {
      // 表头
      "columns": {
        "default": function () {
          return [];
        },
        "required": false
      },
      // 表格数据源
      "data": {
        "default": function () {
          return [];
        }
      },
      // 表格大小
      "tableSize":{
        "default":"small",
        "required": false
      },
      // 是否开启斑马纹
      "stripe":Boolean,
      // 行样式
      "cellStyle": {
        "type": Function,
        "default": () => {
        },
        "required": false
      },
      // 表头样式
      "headerCellStyle": {
        "type": Function,
        "default": () => {
        },
        "required": false
      },
      // 是否前端分页
      "frontendPagination": Boolean,
      // 总数据量
      "total": {
        "default": 0,
        "required": false
      },
      // 分页参数
      "size": {
        "default": 10,
        "required": false
      },
      // 当前页
      "currentPage": {
        "default": 1
      },
      // 每页数量变化回调
      "sizeChange": {
        "default": function () {
          return () => {
          };
        },
        "required": false
      },
      // size集合
      "pageSizes": {
        "default": function () {
          return [10, 20, 30];
        },
        "required": false
      },
      // 分页组件布局
      "layout": {
        "default": "prev, pager, next, jumper",
        "required": false
      },
      // 页数改变回调
      "currentChange": {
        "required": false
      },
      // 点击上一页回调
      "prevClick": {
        "default": function () {
          return () => {
          };
        },
        "required": false
      },
      // 点击下一页回调
      "nextClick": {
        "default": function () {
          return () => {
          };
        },
        "required": false
      },
      "handleSelection": {
        "type": Function,
        "default": () => {
        },
        "required": false
      },
      // 全选回调
      "handleSelectionAll": {
        "type": Function,
        "default": () => {
        },
        "required": false
      },
      // 单击某一行回调
      "rowClick": {
        "type": Function,
        "default": () => {
        },
        "required": false
      },
    },
    data () {
      return {
        // 前端分页临时数据集
        "customData": []
      };
    },
    "watch": {
      data (val) {
        this.customData = val.slice(0, this.size - 1);
      }
    },
    created () {},
    "methods": {
      // 复选框toggle回调
      selectionChanged (...args) {
        this.$emit("selection-change", ...args);
      },
      // 获取button是否禁用
      getDisabled (status, row) {
        if (status instanceof Function) {
          return status(row);
        } else {
          return status;
        }
      },
      // 获取button是否显示
      getVisible (visible, row) {
        if (visible instanceof Function) {
          return visible(row);
        } else {
          return visible;
        }
      },
      // 隐藏popover
      hidePopover (refId) {
        this.$refs[refId][0].showPopper = false;
      },
      // 关闭popover并执行回调
      closePopover (refId, button, row, index) {
        this.$refs[refId][0].showPopper = false;
        if (button.click) {
          button.click(row, index);
        }
      },
      // 页数改变回调
      pageChange (...args) {
        if (this.frontendPagination) {
          this.customData = this.data.slice(args[0], this.size - 1);
        } else {
          if (this.currentChange) {
            this.currentChange(...args);
          } else {
            this.$emit("current-change", ...args);
          }
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .table-component {
    display: flex;
    flex-direction: column;
    .el-pagination {
      margin-top: 0.7em;
      text-align: right;
    }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<style lang="less">
  /*@import '~element-ui/packages/theme-chalk/src/mixins/mixins';*/
  /*@import '~element-ui/packages/theme-chalk/src/common/var';*/

  /*.el-button {*/
    /*&.color-red {*/
      /*&:hover,*/
      /*&:focus {*/
        /*color: mix($--color-white, $--color-danger, 20%);*/
      /*}*/
    /*}*/
    /*&.color-warning {*/
      /*&:hover,*/
      /*&:focus {*/
        /*color: mix($--color-white, $--color-warning, 20%);*/
      /*}*/
    /*}*/
    /*&.color-success {*/
      /*&:hover,*/
      /*&:focus {*/
        /*color: mix($--color-white, $--color-success, 20%);*/
      /*}*/
    /*}*/
  /*}*/
</style>
