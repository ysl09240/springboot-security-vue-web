<template>
    <div class="app-container calendar-list-container">
        <div class="tableBg">
            <!-- 筛选条件 begin -->
            <div class="filter-container">
                <el-input v-model="listQuery.realName" class="filter-item" placeholder="请输入用户姓名"></el-input>
                <el-input v-model="listQuery.jzCode" class="filter-item" placeholder="请输入警务编号"></el-input>
                <el-input class="filter-item" placeholder="请输入身份证号" v-model="listQuery.cerNo"></el-input>

                <Treeselect  class="filter-item"
                             filterable
                             v-model="listQuery.deptId"
                             :options="organizationOptions"
                             :load-options="loadOptions"
                             :multiple="false"
                             placeholder="请选择所属组织"
                             noResultsText="未找到结果..."
                             noOptionsText="未找到结果..."
                            @select="handleTreeSelected"/>

                <el-select class="filter-item" placeholder="请选择角色类型" v-model="listQuery.role" filterable>
                    <el-option v-for="item in roleOptions"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id">{{item.name}}</el-option>
                </el-select>

                <el-input v-model="listQuery.phone" class="filter-item" placeholder="请输入联系电话"></el-input>

                <el-select class="filter-item" placeholder="请选择账号状态" v-model="listQuery.state" filterable>
                    <el-option
                            v-for="item in stateOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                    >{{item.name}}</el-option>
                </el-select>

                <el-date-picker class="filter-item"
                                placeholder="请选择开始日期"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                @change="checkDate"
                                v-model="listQuery.startCreateTime">
                </el-date-picker>

                <el-date-picker class="filter-item"
                                placeholder="请选择结束日期"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                @change="checkDate"
                                v-model="listQuery.endCreateTime">
                </el-date-picker>

                <!-- buttons -->
                <el-button class="query-green-icon" type="primary" icon="el-icon-searchZdy" round @click="search" >查询</el-button>
                <el-button class="query-blue-icon" type="primary" icon="el-icon-resetZdy" round @click="reset">重置</el-button>
                <div class="operation-btn">
                    <el-button class="query-green-icon" type="primary" icon="el-icon-addZdy" round  @click="add">新增</el-button>
                    <el-button class="query-green-icon" type="primary" icon="el-icon-importZdy" round @click="importExcel">批量导入</el-button>
                    <el-button class="query-red-icon" type="primary" icon="el-icon-deleteZdy" round @click="multipleDelete">批量删除</el-button>
                </div>
            </div>
            <!-- 筛选条件 end -->

            <!-- table -->
            <el-table ref="multipleTable"
                      :data="tableData"
                      v-loading="listLoading"
                      @selection-change="handleSelectionChange"
                      empty-text=" "
                      border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" label="序号" width="55" type="index" :index="indexMethod"></el-table-column>

                <el-table-column prop="realName" label="用户姓名" ></el-table-column>
                <el-table-column prop="jzCode" label="警务编号" ></el-table-column>
                <el-table-column prop="cerNo" label="身份证号" ></el-table-column>
                <el-table-column prop="deptLabel" label="所属组织" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone" label="联系电话"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="roleLabel" label="角色类型"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="stateLabel" label="账号状态" :show-overflow-tooltip="true"></el-table-column>

                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="查看" placement="top">
                            <span class="table-detail" @click.stop="detail(scope.row)"></span>
                      </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <span class="table-edit" @click.stop="edit(scope.row)"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <span class="table-dele" @click.stop="delet(scope.row)"></span>
                        </el-tooltip>

                    </template>
                </el-table-column>
            </el-table>

            <!--无数据-->
            <img :src="nonews" alt="" v-show="ishowNodataPic" class="nonews">
        </div>

        <!-- 分页器 -->
        <div class="app-behind">
            <el-pagination background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :page-sizes="[5, 10, 20, 30,50,100]"
                           :page-size="listQuery.pageSize"
                           :current-page="listQuery.pageIndex"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </div>

        <!-- 批量导入弹出框 -->
        <el-dialog :visible.sync="dialog_import" width="20%" title="批量导入" class="user-import-dialog">
                <el-upload :action="uploadURL"
                           :headers="headers"
                           :on-success="handleUploadSuccess"
                           :on-error="handleUploadFail"
                           :file-list="fileList"
                           :show-file-list="false"
                            accept=".zip,.ZIP"
                           :limit="1">
                    <div class="btns-inline">
                        <el-button slot="trigger" size="small" type="success" >直接导入</el-button>

                        <el-button class="query-blue-icon" size="small" type="primary" @click="download">下载模板</el-button>
                    </div>

                </el-upload>
        </el-dialog>
    </div>
</template>

<script>
import userApi from "@/api/userApi";
import roleApi from "@/api/roleApi";
import orgApi from "@/api/orgApi";
import nonews from "@/assets/nonews.png";
import Treeselect from "@riophae/vue-treeselect";
import sessionUtil from '@/utils/sessionUtil'
import Vue from 'vue'
import dictDataApi from "@/api/dictDataApi";

export default {
    components:{Treeselect},
    computed:{
        headers(){
            return {
                "token":sessionUtil.getItem('token')
            }
        },
        uploadURL(){
            return (Vue.prototype.BASE_SERVER_API +'/user/import');
        }
    },
    data() {
        return {
            //选项
            roleOptions:[],
            stateOptions:[],
            organizationOptions:[],

            //筛选条件
            listQuery: {
                pageIndex: 1,
                pageSize: 10,
                realName:'',            //姓名
                jzCode:'',              //编号
                cerNo:'',               //身份证号
                deptId:null,              //组织
                roleId:'',              //角色
                phone:'',               //联系电话
                state:'',               //账号状态
                startCreateTime:'',     //开始时间
                endCreateTime:'',       //结束时间
            },

            //table
            tableData: [],
            listLoading: true,      //true-加载中；false-加载完成
            multipleSelection: [],  //选中数据集合
            nonews,
            ishowNodataPic:false, // 没有数据是显示的图片
            total: null,

            //import
            dialog_import:false,
            fileList:[],
        };
    },
    created() {
        this.getRoleList();
        this.getDeptTree();
        this.getUserState();
        this.getList();
    },
    methods: {
        // 查询角色
        getRoleList(){
            let that = this
            roleApi.allList().then(function (res) {
                that.roleOptions = res.data.data
            }).catch(function(res) {
                console.log('getRoleList fail res :',res);
            });
        },

        //查询组织
        getDeptTree(){
            let that = this
            orgApi.currentUserTree().then(function (res) {
                that.organizationOptions = []
                that.organizationOptions.push(res.data.data)
            }).catch(function(res) {
                console.log('getDeptTree fail res :',res);
            });
        },
        loadOptions({action, parentNode, callback}) {
            callback()
        },
        //选中书选择器
        handleTreeSelected(node){
            console.log(node)
            this.listQuery.deptId = node.id;
        },
        //  点击查询按钮
        search() {
            this.listQuery.pageIndex = 1;
            this.getList();
        },
        getUserState(){
            let that=this;
            dictDataApi.queryByTypes({type:"USER_STATE_TYPE"}).then(function(res){
                if(res.data.data.USER_STATE_TYPE!=null){
                    that.stateOptions = res.data.data.USER_STATE_TYPE;
                }
            })
                .catch(function(res){
                    console.log('get nation fail res :',res);
                })
        },
        //  重置筛选条件
        reset() {
            let that = this,
                x;
            for(x in that.listQuery){
                if(x !='pageIndex' && x != 'pageSize'){
                    if(x == 'deptId'){
                        that.listQuery[x] = null;
                    }else{
                        that.listQuery[x] = '';
                    }
                }
            }
        },

        //  请求table数据
        getList(flag) {
            //时间校验
            if(this.listQuery.startCreateTime && this.listQuery.endCreateTime && (this.listQuery.startCreateTime > this.listQuery.endCreateTime)){
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                return;
            }
            let that = this;
            if(flag){
                that.listQuery.pageIndex = 1;
            }
            this.listLoading = true;
            const param = this.listQuery;
            userApi.list(param)
                .then(function(res) {
                    console.log('getList success res :',res);
                    let data = res.data.data
                    that.tableData = data.list || [];
                    that.total = data.total || 0;
                    that.listLoading = false;
                    that.ishowNodataPic = that.total > 0? false : true;
                })
                .catch(function(res) {
                    console.log('getList fail res :',res);
                    that.listLoading = false;
                    that.ishowNodataPic = that.total > 0? false : true;
                });
        },

        //新增
        add(){
            this.$router.push({name: "userAdd", params: {type: 'add', id: 0}});
        },

        //  table 选择项改变
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
        },

        //查看详情
        detail(row){
            this.$router.push({name: "userDetail", params: {id: row.id}});
        },

        //编辑
        edit(row){
            this.$router.push({name: "userEdit", params: {type: 'edit', id: row.id}});
        },

        //删除
        delet(row) {
            let that = this;
            var param = {
                id: row.id,
            };
            this.$confirm('你确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(res =>{
                userApi.delete(param).then(function(res) {
                    if (res.data.success) {
                        that.getList(true);
                        that.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        });
                    } else {
                        that.$notify({
                            title: "删除失败",
                            message: res.data.msg,
                            type: "warning",
                            duration: 2000
                        });
                    }
                }).catch(function(res) {
                    console.log(res);
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //批量删除
        multipleDelete(){
            let that = this;
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请至少选择一个用户",
                    type: "warning"
                });
                return;
            }
            this.$confirm(
                "您确定删除所选" + this.multipleSelection.length + " 个用户吗?",
                "提示",
                {type: "warning"}
            ).then(() => {
                let arr = [];
                this.multipleSelection.forEach(function (item,index) {
                    arr.push(item.id)
                })
                let param = {
                    ids:arr
                }
                userApi.deleteBatch(param)
                    .then(function(res) {
                        if (res.data.success) {
                            that.getList(true);
                            that.$notify({
                                title: "成功",
                                message: "删除成功",
                                type: "success",
                                duration: 2000
                            });
                        } else {
                            that.$notify({
                                title: "删除失败",
                                message: res.data.msg,
                                type: "warning",
                                duration: 2000
                            });
                        }
                    })
                    .catch(function(res) {
                        console.log(res);
                        that.$notify({
                            title: "删除失败",
                            message: res.data.msg,
                            type: "warning",
                            duration: 2000
                        });
                    });
            }).catch(() => {});

        },

        //下载模板
        download(){
            window.open(Vue.prototype.BASE_SERVER_API + "/user/download/template");
        },

        //导入
        importExcel(){
            this.fileList = [];
            this.dialog_import = true;
        },
        handleUploadSuccess(res, file, fileList) {
            console.log(res)
            if(res.success){
                this.dialog_import = false
                this.$message({
                    message: '导入成功',
                    type: "success"
                });
                this.getList();

            }else{
                this.fileList = [];
                let msg= '导入失败';
                if(res.code !== -98){
                    msg = res.msg;
                }
                this.$message({
                    message: msg,
                    type: "error"
                });
            }
        },
        handleUploadFail(err, file, fileList){
            this.$message({
                message: '上传失败',
                type: "error"
            });
        },
        //当前页currentPage改变
        handleCurrentChange(val) {
            this.listQuery.pageIndex = val;
            this.getList();
        },

        //每页显示个数pageSize改变
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.getList();
        },

        //自定义序号
        indexMethod(index) {
            return (
                index + (this.listQuery.pageIndex - 1) * this.listQuery.pageSize + 1
            );
        },
        checkDate(){
            if(this.listQuery.startCreateTime && this.listQuery.endCreateTime && (this.listQuery.startCreateTime > this.listQuery.endCreateTime)){
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
            }
        }
  }
};
</script>

<style scoped lang="less">
    .btns-inline{
        display: flex;
        justify-content: center;
        .query-blue-icon{
            order:-1;
            margin-right:5%
        }
    }

</style>
