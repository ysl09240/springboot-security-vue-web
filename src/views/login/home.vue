<template>
    <div class="login-contaienr">
        <div class="loginform-wrap">
            <div class="login-title">
                <img :src="Logo" class="logo">
                <b>{{configDate}}</b>
            </div>
            <el-form
                class="login-form"
                label-position="left"
                :model="loginForm"
                ref="loginForm"
                :rules="loginRules"
            >
                <el-form-item prop="username">
                    <el-input
                        name="username"
                        type="text"
                        v-model="loginForm.username"
                        placeholder="用户名">
                        <i slot="prefix" class="el-input__icon icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" style="   ">
                    <el-input
                        name="password"
                        type="password"
                        v-model="loginForm.password"
                        placeholder="密码">
                        <i slot="prefix" class="el-input__icon icon-pwd"></i>
                    </el-input>
                    <span class="contact-container">登陆不了？<span class="contact" @click="contactUs">联系我们</span></span>
                </el-form-item>

                <el-button
                    type="primary"
                    :loading="loading"
                    @click="handleLogin"
                    @keyup.enter.native="handleLogin"
                    class="loginbutton"
                >登&nbsp;&nbsp;录
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Logo from "@/assets/img/logo.png";
    import loginApi from "@/api/loginApi";
    import {get_uuid} from "@/utils/validate";
    import sessionUtil from "@/utils/sessionUtil";
    import phone from "@/assets/icon/phone.png";
    import QRCode from 'qrcodejs2';

    export default {
        data() {
            var validateRandomcode = (rule, value, callback) => {
                var that = this;
                if (value != null && value != "") {
                    if (value != this.identifyCode) {
                        callback(new Error("验证码错误"));
                        that.refreshCode();
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                Logo,
                phone,
                activeIndex: "1",
                activeIndex2: "1",
                dialogFormVisible: false,
                loading: false,
                loginForm: {
                    username: "",
                    password: "",
                    randomcode: ""
                },
                identifyCodes: "1234567890",
                identifyCode: "",
                loginRules: {
                    username: [
                        {
                            required: true,
                            message: "用户名不能为空",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "密码不能为空",
                            trigger: "blur"
                        }
                    ],
                    randomcode: [

                    ]
                },
                configDate: '',
                contactPhone: "",
                copyright:"",
                userT:null,
                isshowQrcode: Vue.prototype.H5 ? true: false
            };
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
            this.getQRcode();
        },
        created() {
            this.username = "";
            this.password = "";
            this.keyupEnter();
            this.configure();
        },
        methods: {
            contactUs(){
                this.$alert('<div>请联系系统管理员</div><div>TEL:18612341234</div>', '提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                })
            },
            configure() {
                this.configDate = config.titles.index;
                this.contactPhone = config.titles.contactPhone;
                this.copyright=config.titles.copyright;
            },
            keyupEnter() {
                document.onkeydown = e => {
                    let body = document.getElementsByTagName("body")[0];
                    if (e.keyCode === 13) {
                        this.handleLogin();
                    }
                };
            },
            //进行登录
            handleLogin() {
                let that = this;
                that.$refs["loginForm"].validate(valid => {
                    if (valid) {
                        that.loading = true;
                        const param = {
                            username: that.loginForm.username,
                            password: that.loginForm.password,
                        };
                        sessionUtil.clear();
                        loginApi.login(param)
                            .then(function(res) {
                                if (res.data.success) {
                                    let data = res.data.data;
                                    sessionUtil.setItem("user", {
                                        id : data.id,
                                        username : data.username,
                                        jzCode: data.jzCode,
                                        deptName: data.deptName,
                                        realName: data.realName,
                                        deptId:data.deptId
                                    });
                                    sessionUtil.setItem("menus", data.menus);
                                    that.loading = false;
                                    that.$message({
                                        message: "登录成功!",
                                        type: "success"
                                    });
                                    that.$router.push({ path: "/userList" });
                                } else {
                                    that.loading = false;
                                    that.refreshCode();
                                    that.$message({
                                        message: res.data.msg,
                                        type: "warning"
                                    });
                                }
                            }).catch(function(res) {
                                console.log(res)
                                that.$message({
                                    message: '登陆失败',
                                    type: "warning"
                                });
                                that.loading = false;

                            });
                    } else {
                        return false;
                    }
                });
            },
            //刷新验证码
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            //生成验证码
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
                }
            },
            // 生成二维码
            getQRcode() {
                if(Vue.prototype.H5){
                    const url = Vue.prototype.H5 + "/DownLoad/worker/index.html"
                    new QRCode('qrcode', {width: 110, height: 110, text: url});
                }
            },
            //生成随机数
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
        }
    };
</script>

<style scoped lang="less">
    .icon-user{
        background: url("../../assets/icon/login_user.png") no-repeat center 47%;
        width: 22px;
        height: 100%;
        display: block;
        padding-left: 12px;
    }
    .icon-pwd{
        background: url("../../assets/icon/login_pwd.png") no-repeat center 47%;
        width: 22px;
        height: 100%;
        display: block;
        padding-left: 12px;
    }
    .contact-container{
        position: absolute;
        right: 4px;
        bottom: -41px;
        font-size: 14px;
        color: #909399;
        .contact{
            color: #15538c;
            cursor: pointer;
        }
    }
</style>
