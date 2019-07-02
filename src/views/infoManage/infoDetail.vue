<template>
    <div class="app-container calendar-list-container el-dialog-bg" style="overflow: auto;">
        <div style="margin:0 2%;width:96%">
            <!--人员信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">人员信息</h3>
                    <div class="gride-right">
                        <span class="level">人员安全级别：{{validateForm.secLev?validateForm.secLev:"未知"}}</span>
                        <span class="sync">{{validateForm.flgSync ==1?"未同步":"未同步"}}</span>
                    </div>
                </div>
                <el-row class="form-group">
                    <el-col :span="2" class="left-container">
                        <img :src="validateForm.headImage?validateForm.headImage:face" class="avatar">
                        <!--<img class="avatar" :src="face">-->
                    </el-col>
                    <el-col :span="22" class="cer-info">
                        <el-row>

                            <el-col :span="5" class="form-item">
                                <div class="label">姓名：</div>
                                <div class="content">{{validateForm.sName}}</div>
                            </el-col>
                            <el-col :span="7" class="form-item">
                                <div class="label">证件类型：</div>
                                <div class="content">{{validateForm.cerTypeName}}</div>
                            </el-col>
                            <el-col :span="5" class="form-item">
                                <div class="label">国籍：</div>
                                <div class="content">{{validateForm.sCountry}}</div>
                            </el-col>
                            <el-col :span="7" class="form-item">
                                <div class="label">证件号码：</div>
                                <div class="content">{{validateForm.cerNo}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="5" class="form-item">
                                <div class="label">民族：</div>
                                <div class="content">{{validateForm.sNationName}}</div>
                            </el-col>
                            <el-col :span="7" class="form-item">
                                <div class="label">有效期限：</div>
                                <div class="content">{{validateForm.cerValid}}</div>
                            </el-col>
                            <el-col :span="5" class="form-item">
                                <div class="label">性别：</div>
                                <div class="content">{{validateForm.sGender}}</div>
                            </el-col>
                            <el-col :span="7" class="form-item">
                                <div class="label">签发机关：</div>
                                <div class="content">{{validateForm.cerAuth}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="5" class="form-item">
                                <div class="label">年龄：</div>
                                <div class="content">{{validateForm.age}}</div>
                            </el-col>
                            <el-col :span="7" class="form-item">
                                <div class="label">户籍地址：</div>
                                <div class="content">{{validateForm.addr1}}</div>
                            </el-col>
                            <el-col :span="5" class="form-item">
                                <div class="label">生日：</div>
                                <div class="content">{{validateForm.sBirth}}</div>
                            </el-col>
                            <el-col :span="7" class="form-item">
                                <div class="label">居住地址：</div>
                                <div class="content">{{validateForm.addr2}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="5" class="form-item">
                                <div class="label">手机号码1：</div>
                                <div class="content">{{validateForm.tel1}}</div>
                            </el-col>
                            <el-col :span="7" class="form-item">
                                <div class="label">手机号码2：</div>
                                <div class="content">{{validateForm.tel2}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>

            <!--采集信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">采集信息</h3>
                </div>
                <el-row class="form-group collect-info">
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="7" class="form-item">
                                <div class="label">采集时间：</div>
                                <div class="content">{{validateForm.createTime}}</div>
                            </el-col>
                            <el-col :span="6" class="form-item">
                                <div class="label">采集人：</div>
                                <div class="content">{{validateForm.createUserName}}</div>
                            </el-col>
                            <el-col :span="5" class="form-item">
                                <div class="label">临时关注：</div>
                                <div class="content">{{validateForm.flgFocus==1?'是':'否'}}</div>
                            </el-col>
                            <el-col :span="6" class="form-item">
                                <div class="label">临时关注备注：</div>
                                <div class="content">{{validateForm.focusDesc}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" class="form-item">
                                <div class="label">采集站点：</div>
                                <div class="content">{{validateForm.stName}}</div>
                            </el-col>
                            <el-col :span="6" class="form-item">
                                <div class="label">采集设备：</div>
                                <div class="content">{{validateForm.devTypeName}}</div>
                            </el-col>
                            <el-col :span="5" class="form-item">
                                <div class="label">强制采集：</div>
                                <div class="content">{{validateForm.flgForce==1?'是':'否'}}</div>
                            </el-col>
                            <el-col :span="6" class="form-item">
                                <div class="label">临时关注结束日期：</div>
                                <div class="content">{{validateForm.focusEndDate}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" class="form-item">
                                <div class="label">采集点坐标：</div>
                                <div class="content">{{validateForm.stCoordinate}}</div>
                            </el-col>
                            <el-col :span="6" class="form-item">
                                <div class="label">采集原因：</div>
                                <div class="content">{{validateForm.reasonCollName}}</div>
                            </el-col>
                            <el-col :span="5" class="form-item">
                                <div class="label">工作对象：</div>
                                <div class="content">{{validateForm.flgWo==1?'是':'否'}}</div>
                            </el-col>
                            <el-col :span="6" class="form-item">
                                <div class="label">站点类型：</div>
                                <div class="content">{{validateForm.stTypeName}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" class="form-item">
                                <div class="label">采集原因描述：</div>
                                <div class="content">{{validateForm.reasonCollDesc}}</div>
                            </el-col>
                            <el-col :span="8" class="form-item">
                                <div class="label">身份标签：</div>
                                <div class="content">{{validateForm.sSign}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>

            <!--识别信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">生物特征</h3>
                </div>
                <el-row class="form-group">
                    <el-col :span="12" class="left-container">
                        <div class="feature-wrap">
                            <img :src="validateForm.irisR?validateForm.irisR:eyeRight" class="avatar">
                            <span class="tag">右眼虹膜</span>
                            <span v-if="validateForm.qR < 75" class="tip-warn">质量：低</span>
                            <span v-else-if="validateForm.qR > 74 && validateForm.qR < 90" class="tip-warn">质量：中</span>
                            <span v-else-if="validateForm.qR > 89" class="tip-success">质量：高</span>
                        </div>
                        <div class="feature-wrap">
                            <img :src="validateForm.irisL?validateForm.irisL:eyeLeft" class="avatar">
                            <span class="tag">左眼虹膜</span>
                            <span v-if="validateForm.qL < 75" class="tip-warn">质量：低</span>
                            <span v-else-if="validateForm.qL > 74 && validateForm.qL < 90" class="tip-warn">质量：中</span>
                            <span v-else-if="validateForm.qL > 89" class="tip-success">质量：高</span>
                        </div>
                        <div class="feature-wrap">
                            <img :src="validateForm.irisFace?validateForm.irisFace:face" class="avatar">
                            <span class="tag">人脸照片</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--<div style="margin:40px 0;text-align: center" label-width="0">-->
            <!--<el-button class="query-gray-icon" @click="back" type="warning" size="small" style="margin-right:40px;"> 取 消 </el-button>-->
        <!--</div>-->
    </div>
</template>

<script>
    import infoApi from "@/api/infoApi";
    import Treeselect from "@riophae/vue-treeselect";
    import {isIdCard} from '@/utils/validate'
    import sessionUtil from "@/utils/sessionUtil";
    import face from "@/assets/img/face.png";
    import eyeLeft from "@/assets/img/eye_left.png";
    import eyeRight from "@/assets/img/eye_right.png";
    import IDHolder from "@/assets/img/ID.png";
    import IDBHolder from "@/assets/img/ID1.png";
    import PoliceHolder from "@/assets/img/Police.png";
    import PoliceBHolder from "@/assets/img/Police1.png";
    import Vue from 'vue'
    export default {
        name: "userDetail",
        components:{Treeselect},
        computed:{
            headers(){
                return {
                    "token":sessionUtil.getItem('token')
                }
            }
        },
        data(){
            return{
                face,
                eyeLeft,
                eyeRight,
                IDHolder,
                IDBHolder,
                PoliceHolder,
                PoliceBHolder,
                type: 'add',
                id: 0,
                roleOptions: [],
                organizationOptions:[],
                validateForm:{

                    //人员信息
                    id: '',
                    sName: '',           //姓名
                    sGender: '',
                    sCountry: '',
                    sNationName: '',
                    sBirth: '',
                    age: '',
                    cerTypeName: '',
                    cerNo: '',
                    cerAuth: '',
                    cerValid: '',
                    addr1: '',
                    addr2: '',
                    tel1: '',
                    tel2: '',
                    secLev: '',
                    flgSync: '',
                    headImage:'',
                    //采集信息
                    createTime: '',
                    devTypeName: '',
                    stName: '',
                    stCoordinate: '',
                    stTypeName: '',
                    createUserName: '',
                    reasonCollName:'',
                    reasonCollDesc: '',
                    sSign: '',
                    flgForce: '',
                    flgWo: '',
                    flgFocus: '',
                    focusDesc: '',
                    focusEndDate: '',
                    //生物特征
                    irisL: '',
                    irisR: '',
                    qL: '',
                    qR: '',
                    irisFace: ''
                },
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getDetail();
        },
        methods: {
            // 获取表单详情
            getDetail() {
                let that = this;
                let params = {
                    id: this.id
                }
                infoApi.detail(params)
                    .then(function (res) {
                        console.log(res)
                        if (res.data.success && res.data.data) {
                            that.validateForm = res.data.data;
                        }
                    })
                    .catch(function (res) {
                    });
            },
            back() {
                this.$router.back(-1);
            },
        }
    }
</script>

<style scoped lang="less">
    .grid-content{
        position: relative;
    }
    .gride-right{
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .level{
        background: #E4F5FD;
        color: #0084CC;
        padding: 6px 12px;
        border-radius: 4%;
        margin-right: 10px;
    }
    .sync{
        background: #F2F2F2;
        color: #7D7D7D;
        padding: 6px 12px;
        border-radius: 4%;
    }
    .form-group{
        border-top:1px solid #e2e1e6;
        border-bottom:1px solid #e2e1e6;
        padding-top: 22px;
        margin-bottom:10px;
        padding-left: 5%;
        padding-bottom: 15px;
    }
    .form-group>.el-col{
        text-align: left;
    }
    .form-item{
        text-align: left;
        line-height: 2;
        position: relative;
    }
    .form-item>div{
        display: inline-block;
    }
    .label{
        width:130px;
        text-align: right;
        color: #7D7D7D;
        font-weight: bold;
        position: absolute;
    }

    .content{
        color: #7C7C7C;
        width: 100%;
        padding-left: 130px;
        box-sizing: border-box;
    }
    .cer-info {
        padding-left: 30px;
        box-sizing: border-box;
        .label{
            width: 80px;
        }
        .content{
            padding-left: 80px;
        }
    }
    .collect-info{
        padding-left: 3%;
    }
    .el-form-item{
        margin-bottom: 10px;
        margin-top: 15px;
        padding-top: 10px;
        padding-right: 10px;
    }
    .avatar{
        width: 109px;
        max-height: 134px;
        flex-shrink: 0;
    }
    .feature-wrap{
        display: inline-block;
        margin-right:8%;
        margin-bottom: 20px;
        text-align: center;
        vertical-align: top;
        .tag{
            background: #E5F2FA;
            color: #0084CF;
            border-radius: 20px;
            padding: 8px 0;
            margin: 10px 5px;
        }
        .tip-success{
            color:#00B992;
        }
        .tip-warn{
            color:#F78056;
        }
    }
    .feature-wrap>span{
        display: block;
    }
    .timeline-container{
        border: 1px solid #e2e1e6;
        height: 450px;
    }
    .timeline-wrap{
        height: 100%;
        position: relative;

    }
    .timeline-wrap::before{
        content: '';
        position: absolute;
        top: 62px;
        bottom:20px;
        margin: auto;
        left: 48px;
        width: 1px;
        height: 98%;
        background: #e2e1e6;
    }
    .timeline-item{
        margin-top: 15px;
        margin-right: 6%;
        position: relative;
        margin-left: 65px;
        background: #F0F8FB;
        padding: 10px;
        .time{
            color: #248DCF;
        }
    }
    .timeline-item::before{
        content: '';
        position: absolute;
        top: 7px;
        left: -27px;
        width: 22px;
        height: 22px;
        background: url("../../assets/icon/time_line.png");
    }
</style>
