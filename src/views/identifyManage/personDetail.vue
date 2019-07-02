<template>
    <div class="app-container calendar-list-container el-dialog-bg" style="overflow: auto;">
        <div style="margin:0 2%;width:96%">
            <!--人员信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">人员信息</h3>
                    <div class="gride-right">
                        <span class="level">人员安全级别：{{personDetail.secLev?personDetail.secLev:"未知"}}</span>
                        <span class="sync">{{personDetail.flgSync?personDetail.flgSync:"未知"}}</span>
                    </div>
                </div>
                <el-row class="form-group">
                    <el-col :span="13">
                        <el-row>
                            <el-col :span="12" class="form-item">
                                <div class="label">姓名：</div>
                                <div class="content">{{personDetail.sname}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">证件类型：</div>
                                <div class="content">{{personDetail.cerTypeName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">国籍：</div>
                                <div class="content">{{personDetail.scountry}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">证件号码：</div>
                                <div class="content">{{personDetail.cerNo}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">民族：</div>
                                <div class="content">{{personDetail.snationName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">有效期限：</div>
                                <div class="content">{{personDetail.cerValid}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">性别：</div>
                                <div class="content">{{personDetail.sgender==1?"男性":"女性"}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">签发机关：</div>
                                <div class="content">{{personDetail.cerAuth}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">年龄：</div>
                                <div class="content">{{personDetail.age}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">户籍地址：</div>
                                <div class="content">{{personDetail.addr1}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">生日：</div>
                                <div class="content">{{personDetail.sbirth?personDetail.sbirth.substring(0,10):""}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">居住地址：</div>
                                <div class="content">{{personDetail.addr2}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">手机号码1：</div>
                                <div class="content">{{personDetail.tel1}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">手机号码2：</div>
                                <div class="content">{{personDetail.tel2}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11" class="left-container">
                        <img class="avatar" :src="personDetail.headImage?personDetail.headImage:face">
                    </el-col>
                </el-row>
            </div>

            <!--采集信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">采集信息</h3>
                </div>
                <el-row class="form-group">
                    <el-col :span="13">
                        <el-row>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集时间：</div>
                                <div class="content">{{personDetail.collTime}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">身份标签：</div>
                                <div class="content">{{personDetail.ssign}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集站点：</div>
                                <div class="content">{{personDetail.codeName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">强制采集：</div>
                                <div class="content">{{personDetail.flgForce==1?"是":"否"}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集点坐标：</div>
                                <div class="content">108.964,34.275</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">工作对象：</div>
                                <div class="content">{{personDetail.flgWo==1?"是":"否"}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">站点类型：</div>
                                <div class="content">{{personDetail.typeName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">临时关注：</div>
                                <div class="content">{{personDetail.flgFocus==1?"是":"否"}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集人：</div>
                                <div class="content">{{personDetail.collName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">临时关注备注：</div>
                                <div class="content">{{personDetail.focusDesc}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集设备：</div>
                                <div class="content">{{personDetail.devTypeName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">临时关注结束日期：</div>
                                <div class="content">{{personDetail.focusEndDate}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集原因：</div>
                                <div class="content">{{personDetail.reasonColl}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集耗时：</div>
                                <div class="content">{{personDetail.timeJz}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集原因描述：</div>
                                <div class="content">{{personDetail.reasonCollDesc}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11" class="left-container">
                        <div class="feature-wrap">
                            <img :src="personDetail.irisR?personDetail.irisR:eyeRight" class="avatar">
                            <span class="tag">右眼虹膜</span>
                            <span v-if="personDetail.qr < 75" class="tip-warn">质量：低</span>
                            <span v-else-if="personDetail.qr > 74 && personDetail.qr < 90" class="tip-warn">质量：中</span>
                            <span v-else-if="personDetail.qr > 89" class="tip-success">质量：高</span>
                        </div>
                        <div class="feature-wrap">
                            <img :src="personDetail.irisL?personDetail.irisL:eyeLeft" class="avatar">
                            <span class="tag">左眼虹膜</span>
                             <span v-if="personDetail.ql < 75" class="tip-warn">质量：低</span>
                            <span v-else-if="personDetail.ql > 74 && personDetail.ql < 90" class="tip-warn">质量：中</span>
                            <span v-else-if="personDetail.ql > 89" class="tip-success">质量：高</span>
                        </div>
                        <div class="feature-wrap">
                            <img :src="personDetail.irisFace?personDetail.irisFace:face" class="avatar">
                            <span class="tag">人脸照片</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <!--识别信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">识别信息</h3>
                </div>
                <el-row class="form-group">
                    <el-col :span="13">
                        <el-row>
                            <el-col :span="24" class="form-item">
                                <div class="label">识别站点：</div>
                                <div class="content">{{distinguishInfo.dzmc}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">识别时间：</div>
                                <div class="content">{{distinguishInfo.opTime}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">识别设备：</div>
                                <div class="content">{{distinguishInfo.devType}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">操作人：</div>
                                <div class="content">{{distinguishInfo.opTeller}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">报警原因：</div>
                                <div class="content">{{distinguishInfo.rsnAlarm}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">报警原因描述：</div>
                                <div class="content">{{distinguishInfo.rsnDesc}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">警综耗时：</div>
                                <div class="content">{{distinguishInfo.timeJz}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11" class="left-container">
                        <div class="timeline-container">
                            <el-scrollbar style="height: 100%" class="timeline-wrap">
                                <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="loading">
                                    <li class="timeline-item" v-for="(item,index) in busIrisRecords" :key='index' @click="getInfo(index)">
                                        <div class="time">{{item.opTime}}</div>
                                        <div>识别站点：{{item.dzmc}}</div>
                                        <div>识别设备：{{item.devType}}</div>
                                        <div>操作人：{{item.opTeller}}</div>
                                        <div>报警原因：{{item.rsnAlarm}}</div>
                                        <div>报警原因描述：{{item.rsnDesc}}</div>
                                    </li>
                                </ul> 
                            </el-scrollbar>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>


      
    </div>
</template>

<script>
    import irisRecordApi from "@/api/irisRecordApi";
    import sessionUtil from "@/utils/sessionUtil";
    import dictDataApi from "@/api/dictDataApi";
    import face from "@/assets/img/face.png";
    import eyeLeft from "@/assets/img/eye_left.png";
    import eyeRight from "@/assets/img/eye_right.png";
    import IDHolder from "@/assets/img/ID.png";
    import IDBHolder from "@/assets/img/ID1.png";
    import PoliceHolder from "@/assets/img/Police.png";
    import PoliceBHolder from "@/assets/img/Police1.png";
    import Vue from 'vue'
    export default {
        name: "personDetail",
        computed:{
            // headers(){
            //     return {
            //         "token":sessionUtil.getItem('token')
            //     }
            // },
            // uploadURL(){
            //     return (Vue.prototype.BASE_SERVER_API +'/upload/file');
            // }
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
                roleOptions: [],
                organizationOptions:[],
                index:0,
                personDetail:{
                    busIrisRecords:{}
                },
                distinguishInfo:{},
                rules: {
                },
                pageIndex:1,
                busIrisRecords:[],
                loading:false,
                validateForm:{
                    imageRightIris:"",
                    imageLeftIris:""
                },
                page:{}

            }
        },
        created() {
            console.log('----------------------------')
            console.log(this.$route.params);
            this.getDetail();
        },
        methods:{
            // 获取识别记录详情
            getDetail(){
                let that = this;
                let params = that.$route.params;
                irisRecordApi.distinguish(params)
                .then(function (res){
                    if(res.data.success && res.data.data){
                                that.personDetail = res.data.data;
                                console.log(that.personDetail);
                                that.page = that.personDetail.busIrisRecords;
                                that.busIrisRecords = that.page.list;
                                that.distinguishInfo = that.busIrisRecords[0];
                            }
                })
                .catch(function(res){
                    console.log('get Detail fail res :',res);
                });
            },
            load() {
                let that = this;
                that.pageIndex = that.pageIndex+1;
                var lastPage = that.page.lastPage;
                if(that.pageIndex>lastPage){
                    return;
                }
                that.loading = true
                let params = {
                    irId:that.personDetail.irId,
                    ciId:that.personDetail.ciId,
                    pageIndex:that.pageIndex,
                    pageSize:5
                }
                irisRecordApi.getBusIrisRecordsList(params).then(function(res){
                    if(res.data.success && res.data.data){
                        var arr=that.busIrisRecords.concat(res.data.data.list);
                        that.busIrisRecords=arr;
                        that.loading = false;
                    }
                    
                })
            },
            getInfo(index){
                let that = this;
                that.distinguishInfo = that.busIrisRecords[index];
            },
            back(){
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
    }
    .form-item>div{
        display: inline-block;
    }
    .label{
        width:130px;
        text-align: right;
        color: #7C7C7C;
    }
    .content{
        color: #7C7C7C;
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
