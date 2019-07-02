<template>
    <div class="app-container calendar-list-container el-dialog-bg" style="overflow: auto;">
        <el-form
                label-position="left"
                label-width="140px"
                style="margin:0 2%;width:96%"
                :model="validateForm"
                ref="validateForm"
                :rules="rules"
        >
            <!--基本信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">基本信息</h3>
                </div>
                <div class="form-group">
                    <el-row>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="realName"
                                          label="用户姓名："
                                          :rules="[
                                        {required: true, message: '请输入用户姓名',trigger: 'blur'},
                                        {max: 20, message: '输入长度必须小于20个字之间', trigger: 'blur' }
                                      ]"
                            >
                                <el-input placeholder="请输入用户姓名" v-model="validateForm.realName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="jzCode"label="警务编号：">
                                <el-input placeholder="请输入警务编号" v-model="validateForm.jzCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="cerNo" label="身份证号：">
                                <el-input placeholder="请输入身份证号" v-model="validateForm.cerNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="gender"
                                          label="性别："
                                          :rules="[
                                        {required: true, message: '请选择性别',trigger: 'blur'},
                                      ]"
                            >
                                <el-radio-group v-model="validateForm.gender">
                                    <el-radio v-for="item in genderOptions"
                                              :key="item.id"
                                              :label="item.value">{{item.name}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="deptId"
                                          label="所属组织："
                                          :rules="[
                                        {required: true, message: '请选择所属组织'},
                                      ]"
                            >
                                <Treeselect placeholder="请选择所属组织"
                                            v-model="validateForm.deptId"
                                            :options="organizationOptions"
                                            :load-options="loadOptions"
                                            :multiple="false"
                                            noResultsText="未找到结果..."
                                            noOptionsText="未找到结果..."
                                            @select="handleTreeSelected"
                                            filterable/>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="phone"label="联系电话：">
                                <el-input placeholder="请输入联系电话" v-model="validateForm.phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <!--账号信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle">账号信息</h3>
                </div>
                <div class="form-group">
                    <el-row>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="username" label="用户名：">
                                <el-input placeholder="请输入用户名" v-model="validateForm.username" :disabled="type=='edit'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="password"
                                          v-if="showPwd"
                                          label="登录密码："
                                          :rules="[
                                            {required: true, message: '密码不能为空',trigger: 'blur'},
                                            {min: 6, max: 20, message: '输入长度必须在6到20个字之间', trigger: 'blur'},
                                          ]"
                            >
                                <el-input placeholder="请输入登录密码" v-model="validateForm.password"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6" class="role-parent-detail">
                            <el-form-item prop="roleId"
                                          label="角色类型："
                                          :rules="[
                                        {required: true, message: '请选择所角色'},
                                      ]"
                            >
                                <el-select v-model="validateForm.roleId" placeholder="请选择角色">
                                    <el-option
                                        v-for="item in roleOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        {{item.name}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <span class="role-child-detail" @click="loadPerms">查看权限</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="state"
                                          label="账号状态："
                                          :rules="[
                                            {required: true, message: '请选择账号状态',trigger: 'blur'},
                                          ]"
                            >
                                <el-radio-group v-model="validateForm.state" :disabled="type=='edit'">
                                    <el-radio v-for="item in stateOptions"
                                              :key="item.id"
                                              :label="item.value">{{item.name}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item prop="repassword" v-if="showPwd" label="确认密码：">
                                <el-input placeholder="请输入用户名" v-model="validateForm.repassword"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <!--证件信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle">证件信息</h3>
                </div>
                <el-row class="form-group" style="padding-left: 5%;">
                    <!--身份证-->
                    <el-col :span="12">
                        <div class="photo-inline" style="margin-right:20px;">
                            <el-upload class="avatar-ID"
                                       :action="uploadURL"
                                       :before-upload="handleBeforeUpload"
                                       :on-success="handleUploadSuccess_cerF"
                                       :headers="headers"
                                       accept="image/jpeg, image/jpg, image/png, image/bmp"
                                       :show-file-list="false">
                                <div v-if="validateForm.cerFPath" class="avatar-ID">
                                    <img :src="validateForm.cerFPath" class="avatar">
                                    <i class="icon-close" @click="handleRemove($event,'cerFPath')"></i>
                                </div>
                                <div v-else class="avatar-holder">
                                    <img :src="IDHolder">
                                </div>
                            </el-upload>
                            <p :class="[validate_cerF ? '' : 'error', 'icon-required']">身份证人像面</p>
                        </div>
                        <div class="photo-inline">
                            <el-upload class="avatar-ID"
                                       :action="uploadURL"
                                       :before-upload="handleBeforeUpload"
                                       :on-success="handleUploadSuccess_cerB"
                                       :headers="headers"
                                       accept="image/jpeg, image/gif, image/png"
                                       :show-file-list="false">
                                <div v-if="validateForm.cerBPath" class="avatar-ID">
                                    <img :src="validateForm.cerBPath" class="avatar">
                                    <i class="icon-close" @click="handleRemove($event,'cerBPath')"></i>
                                </div>
                                <div v-else class="avatar-holder">
                                    <img :src="IDBHolder">
                                </div>
                            </el-upload>
                            <p :class="[validate_cerB ? '' : 'error', 'icon-required']">身份证国徽面</p>
                        </div>
                    </el-col>

                    <!--警员证-->
                    <el-col :span="10">
                        <div class="photo-inline" style="margin-right: 20px;">
                            <el-upload class="avatar-police"
                                       :action="uploadURL"
                                       :before-upload="handleBeforeUpload"
                                       :on-success="handleUploadSuccess_jwB"
                                       :headers="headers"
                                       accept="image/jpeg, image/gif, image/png"
                                       :show-file-list="false">
                                <div v-if="validateForm.jwBPath" class="avatar-police">
                                    <img :src="validateForm.jwBPath" class="avatar">
                                    <i class="icon-close" @click="handleRemove($event,'jwBPath')"></i>
                                </div>
                                <div v-else class="avatar-holder">
                                    <img :src="PoliceHolder">
                                </div>
                            </el-upload>
                            <p :class="[validate_jwB ? '' : 'error', 'icon-required']">警务证人像面</p>
                        </div>
                        <div class="photo-inline">
                            <el-upload class="avatar-police"
                                       :action="uploadURL"
                                       :before-upload="handleBeforeUpload"
                                       :on-success="handleUploadSuccess_jwF"
                                       :headers="headers"
                                       accept="image/jpeg, image/gif, image/png"
                                       :show-file-list="false">
                                <div v-if="validateForm.jwFPath" class="avatar-police">
                                    <img :src="validateForm.jwFPath" class="avatar">
                                    <i class="icon-close" @click="handleRemove($event,'jwFPath')"></i>
                                </div>
                                <div v-else class="avatar-holder">
                                    <img :src="PoliceBHolder">
                                </div>
                            </el-upload>
                            <p :class="[validate_jwF ? '' : 'error', 'icon-required']">警务证国徽面</p>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div style="margin:40px 0">
                <el-button class="query-gray-icon" @click="back" type="warning" size="small" style="margin-right:40px;"> 取 消 </el-button>
                <el-button class="query-blue-icon" @click="submit" type="primary" size="small"> 保 存 </el-button>
                <div v-if="type == 'edit'" style="float:right;">
                    <el-button class="query-green-icon" @click="reset" type="primary" round>重置密码</el-button>
                    <el-button class="query-green-icon" @click="enabeled" type="primary" round>{{validateForm.state == 1?'停用':'启用'}}</el-button>
                </div>
            </div>
        </el-form>
        <!-- 批量导入弹出框 -->
        <el-dialog :visible.sync="showPerms" width="20%" title="角色权限">
            <el-tree :data="permsTree"
                     node-key="id"
                     :default-expand-all="true"
                     disabled="false"
            >
            </el-tree>
        </el-dialog>
    </div>
</template>

<script>
    import userApi from "@/api/userApi";
    import menuApi from "@/api/menuApi";
    import orgApi from "@/api/orgApi";
    import Treeselect from "@riophae/vue-treeselect";
    import {isIdCard} from '@/utils/validate'
    import sessionUtil from "@/utils/sessionUtil";
    import IDHolder from "@/assets/img/ID.png";
    import IDBHolder from "@/assets/img/ID1.png";
    import PoliceHolder from "@/assets/img/Police.png";
    import PoliceBHolder from "@/assets/img/Police1.png";
    import Vue from 'vue'
    import roleApi from "@/api/roleApi";
    import dictDataApi from "@/api/dictDataApi";
    export default {
        name: "userDetail",
        components: {Treeselect},
        computed: {
            headers() {
                return {
                    "token": sessionUtil.getItem('token')
                }
            },
            uploadURL() {
                return (Vue.prototype.BASE_SERVER_API + '/upload/file');
            }
        },
        data() {
            // 校验用户名
            var validate_username = (rule, value, callback) => {
                var that = this;
                var param = {
                    username: that.validateForm.username,
                    id: that.validateForm.id
                };
                userApi.checkUserName(param)
                    .then(function (res) {
                        console.log(res)
                        if (res.data.data) {
                            callback(new Error("用户名已存在，请重新输入"));
                        } else {
                            callback();
                        }
                    })
                    .catch(function (res) {
                        console.log(res);
                    });
            };
            // 校验身份证号码
            var validate_cerNo = (rule, value, callback) => {
                var that = this;
                if (!isIdCard(value)) {
                    callback(new Error("身份证号输入格式有误"));
                } else {
                    var param = {
                        cerNo: that.validateForm.cerNo,
                        id: that.validateForm.id
                    };
                    userApi.checkCerNo(param)
                        .then(function (res) {
                            if (res.data.data) {
                                callback(new Error("身份证号码已存在，请重新输入"));
                            } else {
                                callback();
                            }
                        })
                        .catch(function (res) {
                            console.log(res);
                            this.$message({
                                message: '身份证号码查重失败',
                                type: 'warning'
                            });
                        });
                }
            };
            // 校验再次确认密码
            var validate_repassword = (rule, value, callback) => {
                if (value !== this.validateForm.password) {
                    callback(new Error("两次输入密码不一致")); //班组名称重复
                } else {
                    callback()
                }
            };
            return {
                genderOptions: [],
                stateOptions: [],
                showPwd: true,
                showPerms: false,
                permsTree: [],
                IDHolder,
                IDBHolder,
                PoliceHolder,
                PoliceBHolder,
                type: 'add',
                id: 0,
                roleOptions: [],
                organizationOptions: [],
                validateForm: {
                    realName: '',
                    gender: '0',
                    deptId: null,
                    jzCode: '',
                    phone: '',
                    cerNo: '',
                    username: '',
                    password: '',
                    repassword: '',
                    state: '1',
                    cerFPath: '',        //身份证人像面
                    cerBPath: '',        //身份证国徽面
                    jwBPath: '',         //警务证国徽面
                    jwFPath: '',        //警务证人像面
                    roleId: ''
                },
                validate_cerF: true,
                validate_cerB: true,
                validate_jwB: true,
                validate_jwF: true,
                rules: {
                    jzCode: [
                        {required: true, message: '请输入警务编号', trigger: 'blur'},
                        {max: 10, message: '警务编号长度必须在1到10个字之间', trigger: 'blur'},
                        {pattern: /^[0-9]{1,10}$/, message: '警务编号为数字', trigger: 'blur'}
                    ],
                    cerNo: [
                        {pattern: /^[1-9][0-7]\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/, message: '身份证号码不正确', trigger: 'blur'},
                        {required: true, message: '身份证号码不能为空', trigger: 'blur'},
                        {validator: validate_cerNo, trigger: 'blur'},
                    ],
                    phone: [
                        {max: 13, message: "电话长度不能超过13个字符", trigger: "blur"},
                        {pattern: /^([0-9]{3,4}-[0-9]{7,8}|[0-9]{7,8}|[1][3,4,5,7,8,9][0-9]{9})$/, message: '电话格式不正确', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {min: 6, max: 20, message: '输入长度必须在6到20个字之间', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9]{6,20}$/, message: '用户名为6-20字母加数字', trigger: 'blur'},
                        {validator: validate_username, trigger: 'blur'}
                    ],
                    repassword: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {min:6, max: 20, message: '输入长度必须在6到20个字之间', trigger: 'blur'},
                        {validator: validate_repassword, trigger: 'blur'},
                    ]
                },
            }
        },
        created() {
            this.type = this.$route.params.type;
            this.id = this.$route.params.id;
            if(this.type =='edit'){
                this.rules.username = this.rules.username[0]
            }
            this.getUserState();
            this.getGender();
            this.getDeptTree();
            this.getRoleList();
            this.getDetail();
            if(this.id !== 0){
                this.showPwd = false
            }
        },
        methods: {
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
            getGender(){
                let that=this;
                dictDataApi.queryByTypes({type:"GENDER_TYPE"}).then(function(res){
                    if(res.data.data.GENDER_TYPE!=null){
                        that.genderOptions = res.data.data.GENDER_TYPE;
                    }
                })
                    .catch(function(res){
                        console.log('get nation fail res :',res);
                    })
            },
            // 获取表单详情
            getDetail() {
                let that = this;
                if (this.type === 'edit') {
                    let params = {
                        id: this.id
                    }
                    userApi.detail(params)
                        .then(function (res) {
                            console.log(res)
                            if (res.data.success && res.data.data) {
                                that.validateForm = res.data.data;
                            }
                        })
                        .catch(function (res) {
                        });
                }
            },
            //获取角色类型
            getRoleList() {
                let that = this
                roleApi.allList().then(function (res) {
                    that.roleOptions = res.data.data
                }).catch(function (res) {
                    console.log('getRoleList fail res :', res);
                });
            },
            //获取组织列表
            getDeptTree() {
                let that = this
                orgApi.currentUserTree().then(function (res) {
                    that.organizationOptions.push(res.data.data)
                }).catch(function (res) {
                    console.log('getDeptTree fail res :', res);
                });
            },
            loadOptions({action, parentNode, callback}) {
                callback()
            },
            handleTreeSelected(node) {
                console.log(node)
                this.validateForm.deptId = node.id;
            },
            //选中树选择器
            loadPerms() {
                if(this.validateForm.roleId===""){
                    this.$notify({
                        title: "角色权限",
                        message: "未选择角色，没法查看权限",
                        type: "warning",
                        duration: 2000
                    });
                    return;
                }
                this.showPerms = true;
                let that = this
                menuApi.findTreeByRoleId({roleId: this.validateForm.roleId})
                .then(function (res) {
                    if (res.data.success) {
                        that.permsTree = res.data.data;
                    } else {
                        that.$notify({
                            title: "失败",
                            message: res.data.msg,
                            type: "warning",
                            duration: 2000
                        });
                    }
                });
            },
            //提交表单
            submit() {
                let that = this;
                that.$refs['validateForm'].validate(valid => {
                    if (valid && that.validateForm.cerFPath && that.validateForm.cerBPath && that.validateForm.jwBPath && that.validateForm.jwFPath) {
                        var params = that.validateForm;
                        if (this.type === 'add') {
                            userApi.save(params)
                                .then(function (res) {
                                    if (res.data.success) {
                                        that.$notify({
                                            title: "成功",
                                            message: '新增用户成功',
                                            type: "success",
                                            duration: 2000
                                        });

                                        that.back();
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
                                        message: res.data.msg,
                                        type: "warning",
                                        duration: 2000
                                    });
                                });
                        }else{
                            userApi.update(params)
                                .then(function (res) {
                                    if (res.data.success) {
                                        that.$notify({
                                            title: "成功",
                                            message: '修改用户成功',
                                            type: "success",
                                            duration: 2000
                                        });

                                        that.back();
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
                                        message: res.data.msg,
                                        type: "warning",
                                        duration: 2000
                                    });
                                });
                        }
                    } else {
                        that.validate_cerF = that.validateForm.cerFPath ? true : false;
                        that.validate_cerB = that.validateForm.cerBPath ? true : false;
                        that.validate_jwB = that.validateForm.jwBPath ? true : false;
                        that.validate_jwF = that.validateForm.jwFPath ? true : false;
                        that.$notify({
                            title: "失败",
                            message: "请填写完整信息",
                            type: "warning",
                            duration: 2000
                        });
                        return false;
                    }
                });
            },
            handleRemove(e, x) {
                e.stopPropagation();
                console.log(111);
                this.validateForm[x] = ''
            },
            //上传文件之前的钩子
            handleBeforeUpload(file) {
                console.log(file);
                if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp') {
                    return true;
                } else {
                    this.$message.error('上传文件必须为jpg、jpeg、png、bmp格式的图片');
                    return false;
                }
            },
            //文件上传成功时的钩子
            handleUploadSuccess_cerF(res, file) {
                console.log(file)
                if (file.response.success) {
                    this.validateForm.cerFPath = file.response.data;
                    this.validate_cerF = true;
                }
            },
            handleUploadSuccess_cerB(res, file) {
                console.log(file)
                if (file.response.success) {
                    this.validateForm.cerBPath = file.response.data;
                    this.validate_cerB = true;
                }
            },
            handleUploadSuccess_jwF(res, file) {
                console.log(file)
                if (file.response.success) {
                    this.validateForm.jwFPath = file.response.data;
                    this.validate_jwF = true;
                }
            },
            handleUploadSuccess_jwB(res, file) {
                console.log(file)
                if (file.response.success) {
                    this.validateForm.jwBPath = file.response.data;
                    this.validate_jwB = true;
                }
            },
            //重置密码
            reset() {
                let that = this;
                this.$confirm('重置后此账户的密码将会设置为“sy123abc”，您确定重置密码吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    userApi.resetPwd({id: this.id}).then(function (res) {
                        if (res.data.success) {
                            that.$message({
                                type: 'success',
                                message: '重置密码成功!'
                            });
                        } else {
                            that.$notify({
                                title: "重置密码失败",
                                message: res.data.msg,
                                type: "warning",
                                duration: 2000
                            });
                        }
                    })

                }).catch(() => {
                });
            },
            //  停用/启用
            enabeled() {
                let that = this;
                let text = this.validateForm.state == 1 ? '停用' : '启用'
                let stateValue = this.validateForm.state == "1" ? "0" : "1";
                this.$confirm('您确定' + text + '该账号吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    userApi.updateState({
                        id: that.id,
                        state: stateValue
                    }).then(function (res) {
                        if (res.data.success) {
                            that.getDetail();
                            that.$message({
                                type: 'success',
                                message: '账号' + text + '成功!'
                            });
                        } else {
                            that.$notify({
                                title: "重置密码失败",
                                message: '账号' + text + '成功!',
                                type: "warning",
                                duration: 2000
                            });
                        }
                    })
                }).catch(() => {
                });
            },
            back() {
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped>
    .icon-required::before{
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
    }
    .icon-required.error::after{
        content: '请上传照片';
        color: #F56C6C;
        margin-right: 4px;
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
    }
    .form-group{
        border-top:1px solid #e2e1e6;
        border-bottom:1px solid #e2e1e6;
        padding-top: 22px;
        margin-bottom:10px;
    }
    .form-group>.el-col{
        text-align: left;
    }
    .photo-inline{
        display: inline-block;
        text-align: center;
    }
    .avatar-ID{
        width: 289px;
        height: 185px;
        position: relative;
    }
    .avatar-police{
        width: 155px;
        height: 248px;
        position: relative;
    }
    .avatar-holder{
        position: relative;
    }
    .avatar{
        width: 100%;
        max-height: 100%;
    }
    .avatar-holder::before{
        position: absolute;
        background: rgba(248,248,255,0.7);
        content: '';
        width: 100%;
        height: 100%;
        z-index: 9;
        top: 0;
        left: 0;
        border-radius: 5%;
    }
    .avatar-holder::after{
        position: absolute;
        background: url(../../assets/icon/upload_add.png) no-repeat;
        content: '';
        width: 50px;
        height: 50px;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    .icon-close{
        background: url(../../assets/icon/close_pic.png) no-repeat;
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .role-parent-detail{
        position: relative;
    }

    .role-child-detail{
        position: absolute;
        right: -5em;top: 11px;
        color: blue;
        cursor:pointer;
    }


</style>
