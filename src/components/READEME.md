# TreeGrid组件使用说明

## Attributes


| 参数          | 说明           | 类型    | 可选值               | 默认值 |
| ------------- | -------------- | ------- | -------------------- | ------ |
| columns      | 表头 | Array | -  | []   |
| data      | 表格数据源 | Array | -  | []   |
| size | 表格大小   | String | medium / small / mini | small  |
| stripe       | 是否斑马纹       | Boolean   | - | false  |
| cellStyle       | 行样式       | Function   | - | -  |
| headerCellStyle       | 表头样式       | Function   | - | -  |
| frontendPagination       | 是否开启分页 | Boolean   | - | false  |
| total       | 总数据量       | Number   | - | 0  |
| size    | 单页显示数据量         | Number   | - | 10     |
| currentPage      | 当前页 | Number | -                    | 1   |

## Events


| 事件名称 | 说明         | 回调参数   |
| -------- | ------------ | ---------- |
| deleteCate   | 删除商品分类 | 商品分类id |
| editCate     | 编辑商品分类 | 商品分类id |

## 示例

```html
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
```

```js
data () {
  return {
    dataSource: [],
    columns: [{
      text: '分类名称',
      dataIndex: 'cat_name',
      width: ''
    }, {
      text: '是否有效',
      dataIndex: 'cat_deleted',
      width: ''
    }, {
      text: '排序',
      dataIndex: 'cat_level',
      width: ''
    }]
  }
},
methods: {
  deleteCategory (cid) {
    console.log(cid)
  },
  editCategory (cid) {
    console.log(cid)
  }
}
```

