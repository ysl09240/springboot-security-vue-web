<template>
    <div class="app-container calendar-list-container">

        <div class="tableBg">
            <div class="filter-container">
                <el-input class="filter-item" placeholder="请输入字段名称" v-model="listQuery.name"></el-input>
                <el-select
                    placeholder="请选择字段类型"
                    v-model="listQuery.type"
                    @change="currentSel"
                    class="filter-item"
                    filterable
                >
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                    >
                        <!--或者这样-->
                        {{item.name}}
                    </el-option>
                </el-select>
                <el-button
                    round
                    class="query-green-icon"
                    type="primary"
                    @click="search"
                    icon="el-icon-searchZdy"
                >查询
                </el-button>
                <!-- <el-button
                     round
                     class="query-blue-icon"
                     type="primary"
                     @click="exportExcel"
                     icon="el-icon-exportZdy"
                 >导出
                 </el-button>-->
                <el-button
                    round
                    class="query-blue-icon"
                    type="primary"
                    @click="reset"
                    icon="el-icon-resetZdy"
                >重置
                </el-button>
                <div class="operation-btn">
                    <el-button
                        round
                        class="query-green-icon"
                        type="primary"
                        @click="add"
                        icon="el-icon-addZdy"
                    >新增
                    </el-button>
                    <el-button round class="query-red-icon"   type="primary" @click="deleteDic()" icon="el-icon-deleteZdy">批量删除</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                ref="multipleTable"
                v-loading="listLoading"
                @selection-change="handleSelectionChange"
                style="width: 100%"
                empty-text=" "
                border
                @row-click="clickRow"
                :cell-class-name="rowClass"
            >
                <el-table-column type="selection" v-model="multipleSelection"></el-table-column>

                <el-table-column align="center" label="ID" type="index" width="55" :index="indexMethod"></el-table-column>

                <el-table-column prop="name" label="字段名称" :show-overflow-tooltip="true" align="left"></el-table-column>

                <el-table-column prop="value" label="字段值" :show-overflow-tooltip="true" align="left"></el-table-column>

                <el-table-column prop="typeName" label="字段类型" :show-overflow-tooltip="true" align="left"></el-table-column>

                <el-table-column prop="orderNum" label="显示顺序" :show-overflow-tooltip="true"></el-table-column>

                <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" align="left"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <span class="table-edit" @click.stop="edit(scope.$index, scope.row)"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <span class="table-dele" @click='dele(scope.$index, scope.row)'></span>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <img :src="nonews" alt="" v-show="ishowNodataPic" class="nonews">
        </div>

        <div class="app-behind">
            <!--分页 start-->
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 20, 30,50,100]"
                :page-size="listQuery.pageSize"
                :current-page="listQuery.pageIndex"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
            <!--分页 end-->
        </div>

        <!-- 添加弹窗 新增/编辑页面  start-->
        <el-dialog :visible.sync="dialogEdit" width="40%" :title="editTitle">
            <el-form
                label-position="left"
                label-width="100px"
                style="margin:0 6%;width:86%"
                :model="editValidateForm"
                ref="editValidateForm"
            >
                <el-input type="hidden" v-model="editValidateForm.id"></el-input>
                <el-form-item
                    prop="name"
                    label="字段名称："
                    :rules="[{ required: true, message: '字段名称不能为空'},{ max:10 ,message:'字段名称长度不能超过10个字符'}]"
                >
                    <el-input placeholder="请输入字段名称" v-model="editValidateForm.name"></el-input>
                </el-form-item>

                <el-form-item
                    prop="value"
                    label="字段值："
                    :rules="[{ required: true, message: '字段值不能为空'},{ max:32 ,message:'字段名称长度不能超过32个字符'}]"
                >
                    <el-input placeholder="请输入字段值" v-model="editValidateForm.value"></el-input>
                </el-form-item>

                <el-form-item
                    prop="type"
                    label="字段类型："
                    :rules="[{ required: true, message: '字段类型不能为空'}, { max:32 ,message:'字段名称长度不能超过32个字符'}]"
                >
                    <el-select v-model="editValidateForm.type" placeholder="请选择字段类型" style="width:100%"
                               @change="currentOrderNum" filterable>
                        <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        >
                            <!--或者这样-->
                            {{item.name}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="orderNum"
                    label="显示顺序："
                    :rules="[
                { required: true, message: '字段值不能为空'},
                { validator: validateOrderNum ,trigger:'blur'}
              ]"
                >
                    <el-select v-model="editValidateForm.orderNum" placeholder="请选择显示顺序" style="width:100%">
                        <el-option
                            v-for="item in orderNumOptions"
                            :key="item.orderNum"
                            :label="item.orderNum"
                            :value="item.orderNum"
                        >
                            <!--或者这样-->
                            {{item.orderNum}}
                        </el-option>
                    </el-select>
                    <!--<el-input placeholder="请输入显示顺序" v-model="editValidateForm.orderNum"></el-input>-->
                </el-form-item>
                <el-form-item
                    label="备注："
                    prop="remark"
                    :rules="[
                  { max:20 ,message:'备注长度不能超过20个字符'}
              ]"
                >
                    <el-input type="textarea" v-model="editValidateForm.remark"></el-input>
                </el-form-item>

                <div style="margin-top:40px" >
                    <el-button @click="cancel" class="query-gray-icon" type="warning" size="small">取消</el-button>
                    <el-button @click="submitEditForm('editValidateForm')" :disabled="isDisable" class="query-blue-icon" type="primary" size="small">保存</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!-- 添加弹窗 新增/编辑页面  end-->
    </div>
</template>

<script>
    import dictDataApi from "@/api/dictDataApi";
    import nonews from "@/assets/nonews.png";

    export default {
        data() {
            return {
                validateOrderNum:(rule, value, callback) => {
                    if (value != null && value != "") {
                        if (!/[\d.]/.test(parseInt(value)) ){
                            callback(new Error("序号必须为数字"));
                        }else{
                            callback();
                        }
                    }else{
                        callback();
                    }
                },
                nonews,
                ishowNodataPic: false, // 没有数据是显示的图片
                multipleSelection: [],
                total: null,
                listLoading: true,
                listQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    name: "",
                    type: ""
                },
                tableData: [],
                dialogEdit: false,
                editTitle: "",
                editValidateForm: {
                    id: "",
                    name: "",
                    value: "",
                    type: "",
                    orderNum: '',
                    remark: ""
                },
                typeOptions: [],
                orderNumOptions:[],
                isDisable: false,
                vertifyFail: false, // 校验不通过
            };
        },
        created() {
            this.getList();
            this.getDictList();
        },
        methods: {
            rowClass({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 6) {
                    return 'left-side'
                }
            },
            currentSel(val) {
                // alert(val);
            },
            getDictList() {
                var that = this;
                var param = {
                    type: "60"
                };
                dictDataApi.queryByModel(param).then(function (res) {
                    that.typeOptions = res.data.data || [];
                    that.typeOptions.push({name: "字典类型", value: "60"});
                    that.typeOptions.unshift({name: "请选择字段类型", value: ""});
                });
            },
            //点击 pageSize
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            //点击 currentPage
            handleCurrentChange(val) {
                this.listQuery.pageIndex = val;
                this.getList();
            },
            //序号  排序
            indexMethod(index) {
                return (
                    index + (this.listQuery.pageIndex - 1) * this.listQuery.pageSize + 1
                );
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            currentOrderNum(val) {
                var that = this;
                that.editValidateForm.type = val;
                var param = {
                    type: that.editValidateForm.type
                };
                dictDataApi.findOrderNumSelects(param).then(function(res) {
                    if (res) {
                        that.orderNumOptions = [];
                        that.orderNumOptions = res.data.data;
                        that.editValidateForm.orderNum = res.data.data[0].orderNum;
                    }
                });
            },
            //点击新增按钮
            add() {
                this.editTitle = "新增数据";
                this.editValidateForm = {
                    id: "",
                    name: "",
                    value: "",
                    type: "",
                    orderNum: '',
                    remark: ""
                };
                this.dialogEdit = true;
                if (this.$refs["editValidateForm"] !== undefined) {
                    this.$refs["editValidateForm"].resetFields();
                }
            },
            // 点击修改按钮
            edit(index, raw) {
                var that = this;
                that.editTitle = "编辑数据";
                var param = {
                    id: raw.id,
                    type:raw.type
                };
                dictDataApi.queryByModel(param).then(function (res) {
                    if (res.data.success) {
                        that.orderNumOptions = res.data.data[0].list;
                        that.editValidateForm.id = res.data.data[0].id;
                        that.editValidateForm.name = res.data.data[0].name;
                        that.editValidateForm.value = res.data.data[0].value;
                        that.editValidateForm.type = res.data.data[0].type;
                        that.editValidateForm.remark = res.data.data[0].remark;
                        that.editValidateForm.orderNum = res.data.data[0].orderNum;
                        that.editValidateForm.orderNum = that.editValidateForm.orderNum ?
                            that.editValidateForm.orderNum.toString() : '';
                        that.dialogEdit = true;
                    }
                });
            },
            // 单个删除
            dele(index, raw) {
                var that = this;
                var param = {
                    dictIds: raw.id
                };
                this.$confirm('你确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res =>{
                    dictDataApi
                        .delete(param)
                        .then(function (res) {
                            if (res.data.success) {
                                that.$notify({
                                    title: "成功",
                                    message: "删除成功",
                                    type: "success",
                                    duration: 2000
                                });
                                that.getList(true);
                                that.getDictList();
                            } else {
                                that.$notify({
                                    title: "删除失败",
                                    message: res.data.msg,
                                    type: "warning",
                                    duration: 2000
                                });
                            }
                        })
                        .catch(function (res) {
                            console.log(res);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 批量删除
            deleteDic() {
                var selected = this.multipleSelection;
                var that = this;
                if (selected.length == 0) {
                    this.$message({
                        message: "请选择...",
                        type: "warning"
                    });
                    return;
                }
                this.$confirm(
                    "您确定删除所选" + this.multipleSelection.length + " 个字典吗?",
                    "提示",
                    {type: "warning"}
                ).then(() => {
                    var ids = [];
                    for (var i = 0; i < selected.length; i++) {
                        ids.push(selected[i].id);
                    }
                    var param = {
                        dictIds: ids.join(",")
                    };
                    dictDataApi
                        .delete(param)
                        .then(function (res) {
                            if (res.data.success) {
                                that.$notify({
                                    title: "成功",
                                    message: "删除成功",
                                    type: "success",
                                    duration: 2000
                                });
                                that.getList(true);
                                that.getDictList();
                            } else {
                                that.$notify({
                                    title: "删除失败",
                                    message: res.data.msg,
                                    type: "warning",
                                    duration: 2000
                                });
                            }
                        })
                        .catch(function (res) {
                            console.log(res);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getList(flag) {
                this.listLoading = true;
                var that = this;
                if (flag) {
                    this.listQuery.pageIndex = 1;
                }
                const param = {
                    pageIndex: this.listQuery.pageIndex,
                    pageSize: this.listQuery.pageSize,
                    name: that.listQuery.name,
                    type: that.listQuery.type
                };
                dictDataApi
                    .list(param)
                    .then(function (res) {
                        that.ishowNodataPic = false;
                        that.tableData = res.data.data.list;
                        that.total = res.data.data.total;
                        that.listLoading = false;
                        if (!that.total > 0) {
                            that.ishowNodataPic = true;
                        }
                    })
                    .catch(function (res) {
                        console.log(res);
                        that.listLoading = false;
                    });
            },
            // 点击查询
            search() {
                this.listQuery.pageIndex = 1;
                this.getList(true);
            },
            // 重置操作
            reset() {
                this.listQuery.name = "";
                this.listQuery.type = "";
            },
            //序号  排序
            indexMethod(index) {
                return (
                    index + (this.listQuery.pageIndex - 1) * this.listQuery.pageSize + 1
                );
            },
            // 导出数据
            exportExcel() {
                const param = {
                    name: this.listQuery.name,
                    type: this.listQuery.type
                };
                dictDataApi
                    .exportExcel(param)
                    .then(function (res) {
                        that.$notify({
                            title: "导出成功",
                            message: msgs,
                            type: "success",
                            duration: 2000
                        });
                    })
                    .catch(function (res) {
                        that.$notify({
                            title: "导出失败",
                            message: msge,
                            type: "warning",
                            duration: 2000
                        });
                    });
            },
            //点击保存按钮
            submitEditForm(formName) {
                var that = this;
                that.isDisable = true;
                that.$refs[formName].validate(valid => {
                    if (valid) {
                        var msgs,
                            msge = "";
                        // 判断是修改还是新增来改变提示语
                        if (that.editValidateForm.id) {
                            msgs = "修改成功";
                            msge = "修改失败";
                        } else {
                            msgs = "创建成功";
                            msge = "创建失败";
                        }

                        dictDataApi
                            .add(that.editValidateForm)
                            .then(function (res) {
                                if(res.data.data == 3){
                                    that.$notify({
                                        title: "失败",
                                        message: "同一字段类型字段名称不能重复",
                                        type: "warning",
                                        duration: 2000
                                    });
                                }else if (res.data.data == 2) {
                                    that.$notify({
                                        title: "失败",
                                        message: "同一字段类型字段值不能重复",
                                        type: "warning",
                                        duration: 2000
                                    });
                                } else {
                                    that.$notify({
                                        title: "成功",
                                        message: msgs,
                                        type: "success",
                                        duration: 2000
                                    });
                                    that.getDictList();
                                    that.getList(true);
                                    that.cancel();
                                }
                                that.isDisable = false;
                            })
                            .catch(function (res) {
                                that.isDisable = false;
                                that.$notify({
                                    title: "失败",
                                    message: msge,
                                    type: "warning",
                                    duration: 2000
                                });
                            });
                    } else {
                        that.isDisable = false;
                        if (!this.vertifyFail) {
                            that.$notify({
                                title: "失败",
                                message: "请填写完整信息",
                                type: "warning",
                                duration: 2000
                            });
                            this.vertifyFail = true;
                        }
                    }
                });
            },
            //进入页面  点击取消
            cancel() {
                this.dialogEdit = false;
                var that = this;
                setTimeout(function() {
                    that.$refs["editValidateForm"].clearValidate();
                }, 100);
            },
            //进入编辑页面  点击清空
            resetEditdForm(formName) {
                this.$refs[formName].resetFields();
            },
            // table 行选中
            clickRow(row, e) {
                this.$refs.multipleTable.toggleRowSelection(row)
            }
        },
        watch:{
            "dialogEdit":function (n,o) {
                if(n){
                    this.typeOptions.shift();
                }else {
                    this.typeOptions.unshift({name: "请选择字段类型", value: ""});
                }
            }
        }
    };
</script>

<style scoped lang="less">
</style>



