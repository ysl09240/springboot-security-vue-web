<template>
    <div class="app-container calendar-list-container">
        <div class="tableBg" >
            <div class="filter-container">
                <div class="operation-btn">
                    <el-button round class="query-green-icon" type="primary" @click="add" icon="el-icon-addZdy">新增
                    </el-button>
                    <el-button round class="query-green-icon" type="primary" v-if="isshow" @click="edit"
                               icon="el-icon-edit-outline">编辑
                    </el-button>
                    <el-button round class="query-red-icon" type="primary" v-if="isshow" @click="multipleDelete"
                               icon="el-icon-deleteZdy">删除
                    </el-button>
                </div>
            </div>
            <el-row class="main-wrap">
                <el-col class="main-item left" :span="6">
                    <div class="grid-content bg-purple user-tree left-tree">
                        <!--
                                  show-checkbox : 开启checkbox选择框
                                  :data : 绑定树数据对象
                                  node-key : 主节点的Id
                                  :default-expanded-keys : 默认看开子节点的父节点id数组
                                  :default-checked-keys : 默认选中节点的id
                                  :props="defaultProps" : 设置节点展示内容的节点属性
                                -->
                        <h4 class="tree-title">组织架构</h4>
                        <el-scrollbar class="scrollbar-wrap">
                            <el-tree :data="treeData" node-key="id" :default-expanded-keys="defaultShowDeptIds"
                                     :default-checked-keys="[]" @node-click="handleNodeClick">
                            </el-tree>
                        </el-scrollbar>
                    </div>
                </el-col>
                <el-col class="main-item right" :span="18" style="overflow: auto">
                    <div class="info-header">{{deptData.codeName}}</div>
                    <el-table ref="multipleTable"
                              :data="tableData"
                              v-loading="listLoading"
                              empty-text=" "
                              border>
                        <el-table-column align="center" label="序号" width="55" type="index" :index="indexMethod"></el-table-column>
                        <el-table-column prop="name" label="项目" ></el-table-column>
                        <el-table-column prop="content" label="内容" ></el-table-column>
                    </el-table>

                    <!--<div class="grid-content bg-purple info-wrap">-->
                        <!--<div class="info-header">{{deptData.codeName}}</div>-->
                        <!--<div class="dept-info">-->
                            <!--<el-row class="dept-info-header b-bottom">-->
                                <!--<el-col :span="2" class="b-right">序号</el-col>-->
                                <!--<el-col :span="11" class="b-right">项目</el-col>-->
                                <!--<el-col :span="11">内容</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">1</el-col>-->
                                <!--<el-col :span="11" class="b-right">机构名称</el-col>-->
                                <!--<el-col :span="11">{{deptData.codeName}}</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">2</el-col>-->
                                <!--<el-col :span="11" class="b-right">公安机构代码</el-col>-->
                                <!--<el-col :span="11">{{deptData.zzcode}}</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">3</el-col>-->
                                <!--<el-col :span="11" class="b-right">上级机构</el-col>-->
                                <!--<el-col :span="11">{{deptData.supName==null?'-':deptData.supName}}</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">4</el-col>-->
                                <!--<el-col :span="11" class="b-right">机构类别</el-col>-->
                                <!--<el-col :span="11">{{deptData.typeName}}</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">5</el-col>-->
                                <!--<el-col :span="11" class="b-right">机构状态</el-col>-->
                                <!--<el-col :span="11">{{deptData.invalid=='0'?'停用':'启用'}}</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">6</el-col>-->
                                <!--<el-col :span="11" class="b-right">机构地址</el-col>-->
                                <!--<el-col :span="11">{{deptData.address}}</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">7</el-col>-->
                                <!--<el-col :span="11" class="b-right">机构电话</el-col>-->
                                <!--<el-col :span="11">{{deptData.contract}}</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">8</el-col>-->
                                <!--<el-col :span="11" class="b-right">手机号码</el-col>-->
                                <!--<el-col :span="11">{{deptData.phone}}</el-col>-->
                            <!--</el-row>-->
                            <!--<el-row class="b-bottom">-->
                                <!--<el-col :span="2" class="b-right">9</el-col>-->
                                <!--<el-col :span="11" class="b-right">备注信息</el-col>-->
                                <!--<el-col :span="11">{{deptData.codeAbr}}</el-col>-->
                            <!--</el-row>-->
                        <!--</div>-->
                    <!--</div>-->
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import nonews from "@/assets/nonews.png";
    import orgApi from "@/api/orgApi";
    import sessionUtil from "@/utils/sessionUtil";
    const tableItems =[{id:'codeName',label:'机构名称'},{id:'zzcode',label:'公安机构代码'},{id:'supName',label:'上级机构'},{id:'typeName',label:'机构类别'},{id:'invalid',label:'机构状态'},{id:'address',label:'机构地址'},{id:'contract',label:'机构电话'},{id:'phone',label:'手机号码'},{id:'codeAbr',label:'备注信息'}];
    const tableNames = tableItems.map(el => { return el.id});
    export default {
        name: "organizationList",
        data() {
            return {
                nonews,
                treeData: [],
                defaultShowDeptIds: [],
                tableData:[],
                deptData: {
                    code: '',
                    zzcode: '',
                    codeSpelling: '',
                    codeName: '',
                    codeAbr: '',
                    address: '',
                    contract: '',
                    phone: '',
                    supCode: '',
                    supName: '',
                    invalid: '',
                    sortid: '',
                    ext1: '',
                    ext2: '',
                    type: '',
                    TypeName: '',
                    provinceId: '',
                    cityId: '',
                    areaId: ''
                },
                listLoading: true,
                ishowNodataPic: false,
                isshow: true
            }
        },
        created() {
            this.getTreeData();
            this.showDetail();
        },
        methods: {
            getTreeData() {
                var that = this;
                orgApi.tree()
                    .then(function (res) {
                        var arr = new Array();
                        arr.push(res.data.data);
                        that.treeData = arr;
                        console.log('gettree success res :', arr);
                        that.listLoading = false;
                        that.ishowNodataPic = that.total > 0 ? false : true;
                    })
                    .catch(function (res) {
                        console.log('gettree fail res :', res);
                        that.listLoading = false;
                        that.ishowNodataPic = that.total > 0 ? false : true;
                    });
            },
            add() {
                this.$router.push({name: "organizationAdd", params: {type: 'add', id: "1"}});
            },
            multipleDelete() {
                var that = this;
                this.$confirm('你确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res =>{
                    var param = {code: this.deptData.code}
                    orgApi.delete(param)
                        .then(function (res) {
                            if (res.data.success) {
                                that.$notify({
                                    title: "成功",
                                    message: "删除成功",
                                    type: "success",
                                    duration: 2000
                                });
                                that.getTreeData();
                                that.showDetail();
                            } else {
                                that.$notify({
                                    title: "失败",
                                    message: res.data.msg,
                                    type: "warning",
                                    duration: 2000
                                });
                            }
                        })
                        .catch(function (res) {
                            that.$notify({
                                title: "失败",
                                message: "删除失败",
                                type: "error",
                                duration: 2000
                            });
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                
            },
            edit() {
                this.$router.push({name: "organizationAdd", params: {type: 'edit', id: this.deptData.code}});
            },
            handleNodeClick(data) {
                this.showDetail(data.value);
            },
            showDetail(id) {
                var that = this;
                let user = sessionUtil.getItem('user');
                debugger;
                if (id && id != user.deptId) {
                    that.isshow = true;
                } else {
                    that.isshow = false;
                }
                var param = {id: id}
                orgApi.detail(param)
                    .then(function (res) {
                        that.deptData = res.data.data;
                        //处理表格数据
                        let x,arr = [];
                        for(x in that.deptData){
                            let i = tableNames.indexOf(x);
                            if(i > -1){
                                let obj = {
                                    name : tableItems[i].label,
                                    content: that.deptData[x]
                                }
                                if(x == 'supName' && !obj.content){
                                    obj.content = '-'
                                }
                                if(x== 'invalid'){
                                    obj.content = obj.content == 1?'启用':'停用'
                                }
                                arr[i] = obj
                            }
                        }
                        that.tableData = arr;
                        console.log(that.tableData)
                        console.log('gettree success res :', arr);
                    })
                    .catch(function (res) {
                        console.log('gettree fail res :', res);
                    });
            },
            //序号  排序
            indexMethod(index) {
                return (
                    index +1
                );
            },

        }
    }
</script>

<style scoped lang="less">
    .info-header {
        font-size: 18px;
        line-height: 34px;
        height: 34px;
        color: #516570;
        font-weight: bold;
        text-align: left;
    }
    .main-wrap {
        height: calc(100% - 44px);
        padding-top: 20px;
        box-sizing: border-box;
        border-top: 1px solid #ebeef5;

        .main-item {
            height: 100%;

            &.left {
                padding-right: 20px;
                box-sizing: border-box;

                .tree-title {
                    text-align: center;
                }

                .left-tree {
                    height: 100%;

                    .scrollbar-wrap {
                        height: calc(100% - 57px);
                    }
                }
            }

            &.right {
                padding-left: 10px;
                box-sizing: border-box;

                .info-wrap {
                    height: 100%;
                    .b-bottom {
                        border-bottom: 1px solid #ebeef5;
                        &:last-of-type {
                            border-bottom: none;
                        }
                    }
                    .b-right {
                        border-right: 1px solid #ebeef5;
                    }


                    .dept-info {
                        font-size: 14px;
                        margin-top: 15px;
                        line-height: 45px;
                        border: 1px solid #ebeef5;
                        text-align: center;
                        margin-bottom: 15px;

                        .dept-info-header {
                            background-color: #F9F9F9;
                        }
                    }
                }

            }
        }
    }

</style>
