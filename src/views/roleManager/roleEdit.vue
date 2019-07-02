<template>
    <!-- 弹窗 新增页面 修改页面  start-->
    <div class="app-container el-dialog-bg">
        <el-form
            label-position="left"
            label-width="100px"
            style="margin:0 6%;width:86%"
            :model="editValidateForm"
            ref="editValidateForm"
        >
            <el-col :span="24">
                <div class="grid-content bg-purple-dark" style="text-align:left">
                    <h3 class="dialogTitle">角色信息：</h3>
                </div>
            </el-col>
            <el-row>
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                        <el-form-item prop="name" label="角色名称：" :rules="[
                          { required: true, message: '角色名称不能为空'},
                          { max: 10, message: '角色名称不能超过10个字符', trigger: 'blur' },
                          { validator: validateName, trigger: 'blur'}
                          ]">
                            <el-input placeholder="请输入角色" v-model="editValidateForm.name" :disabled="isEdite"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-form-item label="备注：" prop="descs" :rules="[{ max: 100, message: '备注信息不能超过100个字符', trigger: 'blur' }]">
                <el-input type="textarea" v-model="editValidateForm.descs" :disabled="isEdite" ></el-input>
            </el-form-item>

            <div style="overflow:hidden">
                <el-row>
                    <el-col :span="20" style="margin-right: 20px;" >
                        <div class="grid-content bg-purple user-tree"  v-loading="treeLoading">

                            <h4 style="padding-left: 15px">角色权限</h4>
                            <el-scrollbar style="height:100%;width:auto;padding-bottom: 37px;box-sizing: border-box;">
                                <el-tree :data="treeData"
                                         show-checkbox
                                         node-key="id"
                                         :default-expanded-keys="defaultShowDeptIds"
                                         ref="treeData"
                                         @check-change="handleNodeClick"
                                         :default-checked-keys="editValidateForm.menuId"
                                         v-model="editValidateForm.menuIds"
                                         :disabled="disabledTree"
                                         >
                                </el-tree>
                            </el-scrollbar>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="margin-top:40px">
                <el-button size="small" type="warning" @click="back()" class="query-gray-icon" style="margin-right:40px;"> 返 回 </el-button>
                <el-button size="small" type="primary" @click="submitForm('editValidateForm')" class="query-blue-icon" v-show="!isEdite" > 保 存 </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import roleApi from "@/api/roleApi";
    import Treeselect from "@riophae/vue-treeselect";
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";
    import nonews from "@/assets/nonews.png";

    export default {
        components: { Treeselect },
        data() {
            return {
                validateName: (rule, value, callback) => {
                    var that = this;
                    if(that.editTitle=="新增角色"){
                        if (value != null && value != "") {
                            var params = {
                                'id': that.editValidateForm.id,
                                'name': "name",
                                'value': value
                            };
                            roleApi
                                .checkunique(params)
                                .then(function (res) {
                                    if (!res.data.data) {
                                        callback();
                                    } else {
                                        callback(new Error("角色名称已存在"));
                                    }
                                })
                                .catch(function (res) {
                                    console.log(res);
                                });
                        } else {
                            callback(new Error("角色名称不能为空"));
                        }
                    }else {
                        callback();
                    }

                },
                nonews,
                checkstrictly: false,
                multipleSelection: [],
                dialogEdit: false,
                total: null,
                treeLoading:true,
                getCheckedNodes:'',
                defaultProps: {
                    //可以修改节点的显示属性值对应自己的model
                    children: "children",
                    label: "name"
                },
                defaultShowDeptIds: [],
                editTitle: "",
                editValidateForm: {
                    id: "",
                    name: "",
                    menuIds:"",
                    menuId:[],
                    descs: "",
                },
                tableData: [],
                treeData:[],
                isEdite: false, // 是否允许操控input
                disabledTree:false
            };
        },
        created() {
            const {id,type} = this.$route.params;
            if(!id){
                this.add();
            }else{
                if(type == 'detail'){
                    this.isEdite = true;
                    this.disabledTree=true;
                }
                this.edit();
                this.showMenuTree('');
            }
            this.showMenuTree();
        },
        methods: {
            trim() {
                var that = this;
                for (var item in that.editValidateForm) {
                    if (that.editValidateForm[item]) {
                        if (item == "name" || item == "descs") {
                            that.editValidateForm[item] = $.trim(that.editValidateForm[item]);
                        }
                    }
                }
            },
            //点击新增按钮
            add() {
                this.editValidateForm.id = "";
                this.editTitle = "新增角色";
            },
            showMenuTree(){
                var that = this;
                roleApi.getMenuTree()
                    .then(function(res) {
                        let arr = [
                            {
                                label:'顶级节点',
                                id:'1',
                            }
                        ]
                        arr[0].children = res.data.data
                        that.treeData =  arr;
                        that.treeLoading = false;
                        if(that.$route.params.type == "detail"){
                            const data = res.data.data;
                            if(!data.length) return;
                            data.forEach(v =>{
                                v['disabled'] = true;
                                iterator(v.children)
                            })
                            function iterator(item){
                                item.forEach(v =>{
                                    v['disabled'] = true;
                                    if(v.children &&  v.children.length){
                                        iterator(v.children)
                                    }
                                })
                            }
                        }

                    })
                    .catch(function(res) {
                        console.log('gettree fail res :',res);

                        //that.ishowNodataPic = that.total > 0? false : true;
                    });
            },
            handleNodeClick() {
                var rad=''
                //获取父节点id方法
                var chkIds1 = this.$refs.treeData.getCheckedKeys().concat(this.$refs.treeData.getHalfCheckedKeys()) ;
                for(var i=0;i<chkIds1.length;i++){
                    rad+=chkIds1[i]+","
                }
                var arr=rad.split(',')//把字符串转换成数组
                arr=[...new Set(arr)]; // 数组去重
                rad=arr.join(',')// 把数组转换成字符串
                this.editValidateForm.menuIds=rad;
                //console.log(rids)
            },

            //点击编辑按钮
            edit() {
                var that = this;
                that.editTitle = "编辑角色";

                //this.resetEditForm();
                var param = {
                    id: that.$route.params.id
                };
                roleApi
                    .findById(param)
                    .then(function (res) {
                        var k="";
                            for(var i=0;i<res.data.data.length;i++){
                                that.editValidateForm.id = res.data.data[i].id;
                                that.editValidateForm.name = res.data.data[i].name;
                                that.editValidateForm.descs = res.data.data[i].descs;
                                var j=res.data.data[i].menuIds;
                                k+=j+",";
                            }
                            that.editValidateForm.menuId=k.split(",");



                    })
                    .catch(function (res) {
                        console.log(res);
                    });
                this.dialogEdit = true;
            },
            //进入编辑页面  点击保存
            submitForm(formName) {
                //this.isDisable = true;
                var that = this;
                this.trim();
                this.$refs[formName].validate(valid => {
                    if (valid) {
                       if(that.editValidateForm.id=="" || that.editValidateForm.id ==null){
                           var params = that.editValidateForm;
                           roleApi
                               .save(params)
                               .then(function (res) {
                                   if (res.data.success) {
                                       that.$notify({
                                           title: "成功",
                                           message: "保存成功",
                                           type: "success",
                                           duration: 2000,
                                       });
                                       that.$router.push({ name: "roleList" });
                                       that.dialogEdit = false;
                                   } else {
                                       that.$notify({
                                           title: "保存失败",
                                           message: res.data.msg,
                                           type: "warning",
                                           duration: 2000
                                       });
                                   }
                                   //that.isDisable = false;
                               })
                               .catch(function (res) {
                                   //that.isDisable = false;
                                   console.log(res);
                               });
                       }else{
                           that.editValidateForm.menuIds=that.editValidateForm.menuId.join(',');
                           var params = that.editValidateForm;
                           roleApi
                               .update(params)
                               .then(function (res) {
                                   if (res.data.success) {
                                       that.$notify({
                                           title: "成功",
                                           message: "修改成功",
                                           type: "success",
                                           duration: 2000,
                                       });
                                       that.$router.push({ name: "roleList" });
                                       that.dialogEdit = false;
                                   } else {
                                       that.$notify({
                                           title: "修改失败",
                                           message: res.data.msg,
                                           type: "warning",
                                           duration: 2000
                                       });
                                   }
                                   //that.isDisable = false;
                               })
                               .catch(function (res) {
                                   //that.isDisable = false;
                                   console.log(res);
                               });
                       }

                    } else {
                       // that.isDisable = false;
                        if (!this.vertifyFail) {
                            this.$notify({
                                title: "失败",
                                message: "请填写正确的信息",
                                type: "warning",
                                duration: 2000
                            });
                            this.vertifyFail = true;
                        }
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            //进入编辑页面  点击清空
            // resetEditForm() {
            //     this.editValidateForm.id="";
            //     this.editValidateForm.name = "";
            //     this.editValidateForm.menuIds = "";
            //     this.editValidateForm.descs = "";
            //     setTimeout(function () {
            //         this.$refs["editValidateForm"].clearValidate();
            //     }, 100);
            // },
            back(){
                var that=this;
                that.$router.push({ name: "roleList" });
            },
            // treeselect loadOptions
            loadOptions({action, parentNode, callback}) {
                callback();
            },

        }
    };
</script>

<style scoped lang="less">
    .box-card {
        height: 200px;
        overflow: auto;
        width: 28%;
        float: left;
        margin-left: 5%;
    }
    .el-col-8 {
        margin-top: 10px;
    }
    .el-col-8>div{
        width: 90%;
        margin: 8px auto;
        border-radius: 3px;
        box-shadow: -2px 0 8px -1px #e9e9e9, 0 -2px 8px -1px #e9e9e9, 2px 0 8px -1px #e9e9e9;
    }
    .el-col-8>div>h4{
        color: rgb(104, 122, 131);
        width: 90%;
        border-bottom: 1px solid #ebeef5;
        margin: 4px auto 14px;
        padding-bottom: 10px;
    }
    .el-col-8>div>.treeRoleDiv{
        border-radius: 3px;
        height: 250px;
        overflow: auto;
        width: 95%;
        margin-left: 5%;
    }
</style>
