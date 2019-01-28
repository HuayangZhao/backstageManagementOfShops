<template>
  <div style="width: 100%">
    <el-table
      v-loading="loading"
      ref="multipleTable"
      border
      :header-cell-style="{background:'#F6F6F6',fontWeight:'700',color:'#000'}"
      :data="goodsListData1"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        label="商品信息"
        width="400"
      >
        <template slot-scope="scope">
          <div class="goodsImg">
            <div class="img_Box">
              <img :src="scope.row.videoImgUrl" alt="">
            </div>
            <div class="goodsInfo">
              <!--<p>scope.row.</p>-->
              <a href="#" v-text="scope.row.title"></a>
              <p>商品ID：{{scope.row.id}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        label="当前价">
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        label="单购价"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        label="收藏数"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable
        prop=""
        align="center"
        label="库存"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop=""
        sortable
        align="center"
        label="累计销量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop=""
        sortable
        align="center"
        label="近30天销量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="frameStatus"
        align="center"
        label="在售状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" >在售中</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            style="margin-bottom: 10px"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            style="margin-bottom: 10px"
            @click="handleEdit(scope.$index, scope.row)">下架
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="margin-left: -8px"
            @click="handleEdit(scope.$index, scope.row)">置顶
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="row">
      <div>
        <el-button plain>批量上架</el-button>
        <el-button plain>批量下架</el-button>
      </div>
      <div class="grid-content">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <!--1.基本信息-->
    <el-dialog title="1.商品基本信息" :visible.sync="dialogFormVisible">
      <div class="goodsBaseInfo">
        <el-form :model="productC" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品分类" prop="name">
            <el-cascader placeholder="试试搜索：服装"
                         :options="classifyOptions"
                         filterable
                         size="small"
                         style="width: 300px"
                         v-model=productC.categoryId
                         @change="classification"
            ></el-cascader>
            <span v-text="'您的分类 ：' + classifySelectedName.join(' > ')" style="font-size: 14px;font-weight: 600;color: blue"></span>
          </el-form-item>
          <el-form-item label="商品标题" prop="title">
            <el-input v-model="productC.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="productC.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="警戒库存" prop="warnStock">
            <el-input v-model="productC.warnStock" size="small" type="number"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">下一步</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import {getAllUpperGoods} from "@/api/axios"
  export default {
    data() {
      return {
        loading:true,
        dialogFormVisible: false,
        // 分类源
        classifyOptions:[],
        classifySelectedName:[],
        product: {
          brandId: 1,
          categoryId: 0,
          deleteFlag: 0,
          frameStatus: 1,
          id:6,
          name: "string",
          productVideoUrl: "//cloud.video.taobao.com/play/u/1742848702/p/1/e/6/t/1/216244026072.mp4",
          title: "人人咖人人都是大咖",
          videoImgUrl: "http://192.168.0.129:9999/group1/M00/00/02/wKgAgVxIEP2AAQDGAABPERhkO9k676.jpg",
          warnStock: 0,
          // 选择分类的ID
          classifySelectedId: [],
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          title: [
            { type: 'date', required: true, message: '请输入商品标题', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],

          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },




        formLabelWidth: '120px',
        currentPage4: 4,
        goodsListData: [],
        multipleSelection: []
      }
    },
    mounted(){
      this.getGoodsList()
    },
    methods: {
      getGoodsList(){
        this.loading = true
        getAllUpperGoods('1').then(res=>{
          if(res.data.data !== 1){
            this.goodsListData = res.data.data
            this.loading = false
          }else {
            this.$message.error('请求错误，请刷新页面重试');
          }
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      // 编辑删除
      handleEdit(index, row) {
        console.log(index, row);

        this.dialogFormVisible = true
        // this.$router.push({path:'/editGoods'})
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodsListData.splice(index,1)
          delGoods(row.id).then(res=>{
            console.log(res);
            if(res.data.data === 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else {
              this.$message({
                type: 'error',
                message: '请求失败，请重试!'
              });
            }
          })

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },
      // 获取所有分类
      getAll() {
        getAllSelectList().then(res => {
          console.log(res);
          var newArr = [];
          if(res.status == 200) {
            res.data.forEach(item => {
              if (item.parentId === 0) {
                item.children = [];
                newArr.push(item)
              }
            });
            res.data.forEach(item => {
              newArr.forEach(tisp => {
                if (item.parentId == tisp.value) {
                  tisp.children.push(item)
                }
              })
            });
            this.classifyOptions = newArr;
          }
        })
      },
      // 每次选择的分类value和label
      classification(value){
        this.product.classifySelectedId = value
        this.product.categoryId = value[value.length-1]
        this.vals=getCascaderObj(value, this.classifyOptions);
        let classifyName = []
        this.vals.forEach(item=>{
          classifyName.push(item.label)
        })
        console.log(this.product);
        this.product.brandId = null
        this.classifySelectedName = classifyName
        // 通过分类ID获取品牌
        let idCategory = value[value.length-1]
        getGoodsBrandByCategory(idCategory).then(res=>{
          if(res.data.code == 0){
            this.brandOptions = res.data.data
          }
          else {
            this.$message.error('分类品牌加载失败，请重新选择分类');
          }
        })
      },





      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    computed:{
      goodsListData1(){
        return this.goodsListData
      },
      productC(){
        return this.product
      }
    }
  }
</script>
<style lang="less" scoped>
  .goodsBaseInfo{
    width: 70%;
    margin-top: 10px;
  }
  .goodsImg {
    display: flex;
    .img_Box {
      flex-shrink:0;
      width: 70px;
      height: 70px;
      margin-right: 20px;
      border-radius: 7px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .goodsInfo {
      display: flex;
      flex-direction:column;
      justify-content:center;
      font-size: 12px;
      a {
        text-decoration: none;
        color: blue;
      }
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 10px;
  }


</style>
