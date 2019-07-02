<template>
    <div class="header-usercenter">

        <div class="header-icon">
             <span class="header-icon-wrap" @click="personalVisible = !personalVisible">
                    <el-tooltip class="item" effect="dark" :content="usernamelong" placement="top" disabled>
                            <span>{{realName}}，欢迎您</span>
                        </el-tooltip>
                        <i :class="personalVisible?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                </span>
            <span>
                <img :src="logout" @click="toLogout" class="logout">
            </span>
        </div>
        <transition name="fade">
            <div class="personal-container" v-show="personalVisible">
                <div class="title">个人中心</div>
                <div class="content">
                    <el-row>
                        <el-col :span="10">用户姓名</el-col>
                        <el-col :span="12" :offset="2">{{realName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">警务编号</el-col>
                        <el-col :span="12" :offset="2">{{jzCode}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">所属机构</el-col>
                        <el-col :span="12" :offset="2">{{deptName}}</el-col>
                    </el-row>
                </div>
                <div>
                    <el-button type="primary" @click="showpwdDialog" class="query-blue-icon" round>修改密码</el-button>
                </div>
            </div>
        </transition>
        <!-- 修改密码弹出框 -->
        <el-dialog :close-on-click-modal="false" class="update-pwd-dialog" :visible.sync="showUpdatePwd" width="30%" title="修改密码">
            <el-form :model="validateForm" status-icon :rules="rules" ref="validateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名">
                    {{realName}}
                </el-form-item>
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="validateForm.oldPass" placeholder="请输入原密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="validateForm.pass" placeholder="请输入新密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="validateForm.checkPass" placeholder="请输入确认密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="query-gray-icon" @click="cancel()" size="small">取消</el-button>
                    <el-button class="query-blue-icon" type="primary" @click="updatePwd" size="small">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import sessionUtil from '@/utils/sessionUtil'
    import userlogo from "@/assets/icon/user.png";
    import logout from "@/assets/icon/nav_exit.png";
    import userApi from "@/api/userApi";

    export default {
        data() {
            var validateOldPass = (rule, value, callback) => {
                let that = this
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    if (this.validateForm.oldPwd !== '') {
                        this.$refs.validateForm.validateField('oldPwd');
                    }
                    userApi.checkOldPwd({password: this.validateForm.oldPass}).then(function (res) {
                        if (!res.data.data) {
                            callback(new Error('原密码错误，请输入正确的额原密码'));
                        }else{
                            callback()
                        }
                    }).catch(function(res) {
                        console.log(res);
                    });
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.validateForm.checkPass !== '') {
                        this.$refs.validateForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.validateForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                isCollapse: true,
                searchCriteria: "",
                value4: "",
                subsystemId: "",
                subsystems: [],
                userlogo,
                logout,
                username: "",
                realName:"",
                jzCode:"",
                deptName:"",
                usernamelong: "",
                unRead:0,
                isError:'',
                handleId:"",
                hasEnvirSystem:false,
                subsystemsLength:'',
                personalVisible:false,
                showUpdatePwd: false,
                validateForm: {
                    oldPass: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    oldPass:[
                        {type: 'string', required: true, message: '请输入原密码', trigger: 'blur'},
                        { validator: validateOldPass, trigger: 'blur' },
                        { max: 20, message: '输入长度必须在1到20个字之间', trigger: 'blur' }
                    ],
                    pass: [
                        {type: 'string', required: true, message: '请输入新密码', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' },
                        { max: 20, message: '输入长度必须在1到20个字之间', trigger: 'blur' }
                    ],
                    checkPass: [
                        {type: 'string', required: true, message: '请输入确认密码', trigger: 'blur'},
                        { max: 20, message: '输入长度必须在1到20个字之间', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            let user = sessionUtil.getItem('user');
            this.username = user.username;
            this.realName = user.realName;
            this.jzCode = user.jzCode;
            this.deptName = user.deptName;

        },
        mounted: function () {

        },
        methods: {
            toLogout(){
                sessionUtil.removeItem("user");
                sessionUtil.removeItem("menus");
                sessionUtil.removeItem("token");
                this.$router.push({ path: "/" });
            },
            cancel(){
                this.validateForm = {
                    oldPass: '',
                        pass: '',
                        checkPass: ''
                };
                this.showUpdatePwd = false;

            },
            showpwdDialog(){
                this.showUpdatePwd = true;
                this.personalVisible = false;
            },
            updatePwd(){
                let that = this;
                userApi.updatePwd({
                    oldPassword: that.validateForm.oldPass,
                    newPassword: that.validateForm.pass
                }).then(function (res) {
                    if (res.data.success) {
                        that.$notify({
                            title: '成功',
                            message: '修改密码成功,请重新登录',
                            type: 'success',
                            duration: 2000
                        });
                        that.showUpdatePwd = false;
                        sessionUtil.removeItem("user");
                        sessionUtil.removeItem("menus");
                        sessionUtil.removeItem("token");
                        that.$router.push({ path: "/" });
                    }else{
                        that.$notify({
                            title: "修改密码失败",
                            message: res.data.msg,
                            type: "warning",
                            duration: 2000
                        });
                    }
                    that.validateForm = {
                        oldPass: '',
                        pass: '',
                        checkPass: ''
                    }
                });
            }
        },
        watch: {
        }
    };
</script>
<style scoped lang="less">
    .logout{
        width: 18px;
        height: 18px;
        margin-left: 15px;
    }
    .header-usercenter {
        width:100%;
        overflow: hidden;
        height:80px;
        @media (max-width:1366px){
            height: 60px;
        }
    }
    /*首页系统切换图标  start*/
    .item-wrap {
        padding: 20px 0;
        height: 100%;
        box-sizing: border-box;
        .system-header{
            text-align: center;
            margin: 0 auto;
            width: 30px;
            height: 25px;
            background-size: 100% 100%;
            vertical-align: middle;
            display: block;
        }
        .system-name {
            font-size: 12px;
            display: block;
            @media(max-width: 1366px){
                line-height: 20px;
            }
        }
        @media(max-width:1366px){
            padding: 10px 0;
        }
    }
    .personal-container{
        position: absolute;
        z-index: 9999;
        background: #fff;
        right: 8px;
        top: 84px;
        width: 24%;
        max-width: 280px;
        box-shadow: 0px 0px 11px -2px #989793a3;
        border-radius: 5px;
        line-height: 30px;
        @media (max-width: 1366px){
            top: 64px;
        }
        .title{
            font-size: 18px;
        }
        .content{
            border-top: 1px solid #E8E8E8;
            border-bottom: 1px solid #E8E8E8;
            .el-col-10{
                text-align: right;
            }
            .el-col-12{
                text-align: left;
                color:#999999
            }
        }
    }
    .personal-container>div{
        padding:10px 0;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .header-usercenter .update-pwd-dialog{
        line-height: 0;
    }
</style>
