<template>
    <div class="app-container calendar-list-container el-dialog-bg" style="overflow: auto;">
        <el-form
            label-position="left"
            label-width="140px"
            style="margin:0 6%;width:86%"
        >
            <!--基本信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">基本信息</h3>
                </div>
                <div class="form-group">
                    <el-row>
                        <el-col :md="8" :lg="6">
                            <el-form-item label="用户姓名：">
                                {{user.realName}}
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item label="警务编号：">
                                {{user.jzCode}}
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item label="身份证号：">
                                {{user.cerNo}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :md="8" :lg="6">
                            <el-form-item label="性别：">
                                {{user.genderLabel}}
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item  label="所属组织：">
                                {{user.deptLabel}}
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item label="联系电话：">
                                {{user.phone}}
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
                            <el-form-item label="用户名：">
                                {{user.username}}
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item label="角色类型：">
                                {{user.roleName}}
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="6">
                            <el-form-item label="账号状态：">
                                {{user.stateLabel}}
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
                            <div class="avatar-ID">
                                <div v-if="user.cerFPath" class="avatar-ID">
                                    <img :src="user.cerFPath" class="avatar">
                                </div>
                            </div>
                            <p>身份证人像面</p>
                        </div>
                        <div class="photo-inline">
                            <div class="avatar-ID">
                                <div v-if="user.cerBPath" class="avatar-ID">
                                    <img :src="user.cerBPath" class="avatar">
                                </div>
                            </div>
                            <p>身份证国徽面</p>
                        </div>
                    </el-col>

                    <!--警员证-->
                    <el-col :span="10">
                        <div class="photo-inline" style="margin-right: 20px;">
                            <div class="avatar-police">
                                <div v-if="user.jwBPath" class="avatar-police">
                                    <img :src="user.jwBPath" class="avatar">
                                </div>
                            </div>
                            <p>警务证人像面</p>
                        </div>
                        <div class="photo-inline">
                            <div class="avatar-police">
                                <div v-if="user.jwFPath" class="avatar-police">
                                    <img :src="user.jwFPath" class="avatar">
                                </div>
                            </div>
                            <p>警务证国徽面</p>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div style="margin:40px 0;text-align: center" label-width="0">
                <el-button class="query-gray-icon" @click="back" type="warning" size="small" style="margin-right:40px;"> 取 消 </el-button>
            </div>
        </el-form>

    </div>
</template>

<script>
    import userApi from "@/api/userApi";
    import sessionUtil from "@/utils/sessionUtil";
    export default {
        name: "userDetail",
        computed:{
            headers(){
                return {
                    "token":sessionUtil.getItem('token')
                }
            }
        },
        data(){
            return{
                type: 'add',
                id: 0,
                user: {}
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getDetail();
        },
        methods:{
            // 获取用户详情
            getDetail(){
                let that = this;
                let params = {
                    id: this.id
                }
                userApi.detail(params)
                    .then(function (res) {
                        console.log(res)
                        if (res.data.success && res.data.data) {
                            that.user = res.data.data;
                        }
                    })
                    .catch(function (res) {
                    });
            },

            back(){
                this.$router.back(-1);
            },
        }
    }
</script>

<style scoped lang="less">
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
</style>
