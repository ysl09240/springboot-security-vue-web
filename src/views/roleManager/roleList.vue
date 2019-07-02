<template>
    <div class="app-container calendar-list-container">
        <div class="tableBg">
            <!-- 筛选条件 begin -->
            <div class="filter-container">
                <el-input v-model="listQuery.name" class="filter-item" placeholder="请输入角色姓名"></el-input>
                <!-- buttons -->
                <el-button class="query-green-icon" type="primary" icon="el-icon-searchZdy" round @click="search" >查询</el-button>
                <el-button class="query-blue-icon" type="primary" icon="el-icon-resetZdy" round @click="reset">重置</el-button>
                <div class="operation-btn">
                    <el-button class="query-green-icon" type="primary" icon="el-icon-addZdy" round  @click="add">新增</el-button>
                    <el-button class="query-red-icon" type="primary" icon="el-icon-deleteZdy" round @click="deleteBatch">删除</el-button>
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
                <el-table-column prop="name" label="角色名" ></el-table-column>
                <el-table-column prop="descs" label="备注" ></el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="查看" placement="top">
                            <span class="table-detail" @click.stop="detail(scope.row)"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <span class="table-edit" @click.stop="edit(scope.row)"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <span class="table-dele" @click.stop="dele(scope.row)"></span>
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
    </div>
</template>

<script>
    import roleApi from "@/api/roleApi";
    import nonews from "@/assets/nonews.png";
    import sessionUtil from '@/utils/sessionUtil'
    import Vue from 'vue'

    export default {
        data() {
            return {

                //筛选条件
                listQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    name:""
                },

                //table
                tableData: [],
                listLoading: true,      //true-加载中；false-加载完成
                multipleSelection: [],  //选中数据集合
                nonews,
                ishowNodataPic:false, // 没有数据是显示的图片
                total: null,
            };
        },
        created() {
            this.getList();
        },
        methods: {
            loadOptions({action, parentNode, callback}) {
                callback()
            },
            //  点击查询按钮
            search() {
                this.listQuery.pageIndex = 1;
                this.getList();
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
                let that = this;
                this.listLoading = true;
                if(flag){
                    that.listQuery.pageIndex = 1;
                }
                const param = this.listQuery;
                roleApi.list(param)
                    .then(function(res) {
                        let data = res.data.data
                        that.tableData = data.list || [];
                        that.total = data.total || 0;
                        that.listLoading = false;
                        that.ishowNodataPic = that.total > 0? false : true;
                    })
                    .catch(function(res) {
                        that.listLoading = false;
                        that.ishowNodataPic = that.total > 0? false : true;
                    });
            },

            //新增
            add(){
                this.$router.push({name: "roleAdd"});
            },
            //  table 选择项改变
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },

            //查看详情
            detail(row){
                this.$router.push({ name: "roleDetails",params: { id: row.id,type:'detail' }});
            },

            //编辑
            edit(row){
                this.$router.push({name: "roleEdit",
                    params: { id: row.id,type:'edit'}
                })
            },

            //批量删除按钮
            deleteBatch() {
                var selected = this.multipleSelection;
                var that = this;
                if (selected.length == 0) {
                    this.$message({
                        message: "请选择...",
                        type: "warning"
                    });
                    return;
                }
                var ids = [];
                for (var i = 0; i < selected.length; i++) {
                    ids.push(selected[i].id);
                }
                const param = {
                    ids: ids.join(",")
                };
                // var param = {
                //   id: selected[0].id
                // };
                this.$confirm(
                    //"是否删除 " + selected.length + " 个用户?",
                    "是否删除当前角色",
                    "提示",
                    { type: "warning" }
                )
                    .then(() => {
                        roleApi.findUserRoleById(param).then(function(res) {
                            if (res.data.data.length!=0) {
                                that.$notify({
                                    title: "删除失败",
                                    message: "有用户为此角色,请先移除",
                                    type: "warning",
                                    duration: 2000
                                });
                            } else {
                                roleApi
                                    .delete(param)
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
                                    });
                            }
                        }).catch(function(res) {
                            console.log(res);
                        });

                    })
                    .catch(() => {});
            },
            //删除
            dele(row) {
                let that = this;
                var param = {
                    ids: row.id,
                };
                this.$confirm('你确定要删除此角色吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    roleApi.findUserRoleById(param).then(function(res) {
                        if (res.data.data.length!=0) {
                            that.$notify({
                                title: "删除失败",
                                message: "有用户为此角色,请先移除",
                                type: "warning",
                                duration: 2000
                            });
                        } else {
                            roleApi.delete(param).then(function(res) {
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

    .el-icon-close,.el-icon-close-tip{
        display: none !important;
    }
</style>
