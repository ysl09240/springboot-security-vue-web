<template>
    <div class="app-container calendar-list-container el-dialog-bg" style="overflow: auto;">
        <div style="margin:0 2%;width:96%">
            <!--人员信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">人员信息</h3>
                    <div class="gride-right">
                        <span class="level">人员安全级别：{{recordDetail.securityLevel?recordDetail.securityLevel:"未知"}}</span>
                        <span class="sync">{{recordDetail.flgSync?recordDetail.flgSync:"未知"}}</span>
                    </div>
                </div>
                <el-row class="form-group">
                    <el-col :span="15" style="padding-right: 20px;box-sizing: border-box">
                        <el-row>
                            <el-col :span="12" class="form-item">
                                <div class="label">姓名：</div>
                                <div class="content">{{recordDetail.name}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">证件类型：</div>
                                <div class="content">{{recordDetail.cerType}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">国籍：</div>
                                <div class="content">{{recordDetail.country}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">证件号码：</div>
                                <div class="content">{{recordDetail.cerNo}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">民族：</div>
                                <div class="content">{{recordDetail.nation}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">有效期限：</div>
                                <div class="content">{{recordDetail.cerValid}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">性别：</div>
                                <div class="content">{{recordDetail.gender}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">签发机关：</div>
                                <div class="content">{{recordDetail.cerAuth}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">年龄：</div>
                                <div class="content">{{recordDetail.age}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">户籍地址：</div>
                                <div class="content">{{recordDetail.residenceAddr}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">生日：</div>
                                <div class="content">{{recordDetail.birthday}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">居住地址：</div>
                                <div class="content">{{recordDetail.addr2}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">手机号码1：</div>
                                <div class="content">{{recordDetail.tel1}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">手机号码2：</div>
                                <div class="content">{{recordDetail.tel2}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="9" class="left-container">
                        <img class="avatar" :src="recordDetail.headImage?recordDetail.headImage:face">
                    </el-col>
                </el-row>
            </div>

            <!--采集信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">采集信息</h3>
                </div>
                <el-row class="form-group">
                    <el-col :span="14">
                        <el-row>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集时间：</div>
                                <div class="content">{{recordDetail.collTime}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">身份标签：</div>
                                <div class="content">{{recordDetail.identityLabel}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集站点：</div>
                                <div class="content">{{recordDetail.collName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">强制采集：</div>
                                <div class="content">{{recordDetail.flgForce==0?"否":"是"}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集点坐标：</div>
                                <div class="content">{{recordDetail.collCoordinateX?recordDetail.collCoordinateX+",":""}}{{recordDetail.collCoordinateY}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">工作对象：</div>
                                <div class="content">{{recordDetail.flgWorker==0?"否":"是"}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">站点类型：</div>
                                <div class="content">{{recordDetail.siteType}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">临时关注：</div>
                                <div class="content">{{recordDetail.flgFocus==0?"否":"是"}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集人：</div>
                                <div class="content">{{recordDetail.collWorker}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">临时关注备注：</div>
                                <div class="content">{{recordDetail.flgFocusDesc}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集设备：</div>
                                <div class="content">{{recordDetail.devType}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">临时关注结束日期：</div>
                                <div class="content">{{recordDetail.endFocus}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集原因：</div>
                                <div class="content">{{recordDetail.collReason}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集耗时：</div>
                                <div class="content">{{recordDetail.collConsumption}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">采集原因描述：</div>
                                <div class="content">{{recordDetail.collReasonDesc}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10" class="left-container">
                        <div class="feature-wrap">
                            <img :src="recordDetail.irisLeft?recordDetail.irisLeft:eyeLeft" class="avatar">
                            <span class="tag">左眼虹膜</span>
                            <span v-if="recordDetail.irisLeftQuality < 75" class="tip-warn">质量：低</span>
                            <span v-else-if="recordDetail.irisLeftQuality > 74 && recordDetail.irisLeftQuality < 90" class="tip-warn">质量：中</span>
                            <span v-else-if="recordDetail.irisLeftQuality > 89" class="tip-success">质量：高</span>
                        </div>
                        <div class="feature-wrap">
                            <img :src="recordDetail.irisRight?recordDetail.irisRight:eyeRight" class="avatar">
                            <span class="tag">右眼虹膜</span>
                            <span v-if="recordDetail.irisRightQuality < 75" class="tip-warn">质量：低</span>
                            <span v-else-if="recordDetail.irisRightQuality > 74 && recordDetail.irisRightQuality < 90" class="tip-warn">质量：中</span>
                            <span v-else-if="recordDetail.irisRightQuality > 89" class="tip-success">质量：高</span>
                        </div>
                        <div class="feature-wrap">
                            <img :src="recordDetail.facePath?recordDetail.facePath:face" class="avatar">
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
                                <div class="content">{{recordDetail.dzmc}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">识别时间：</div>
                                <div class="content">{{recordDetail.opTime}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">识别设备：</div>
                                <div class="content">{{recordDetail.devType}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">操作人：</div>
                                <div class="content">{{recordDetail.opTeller}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">报警原因：</div>
                                <div class="content">{{recordDetail.alarmReason}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">报警原因描述：</div>
                                <div class="content">{{recordDetail.alarmReasonDesc}}</div>
                            </el-col>
                            <el-col :span="24" class="form-item">
                                <div class="label">警综耗时：</div>
                                <div class="content">{{recordDetail.jzTime}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11" class="left-container">
                        <div class="timeline-container" >
                            <ul class="infinite-list timeline-wrap" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                                <li class="timeline-item" v-for="(item,index) in recordList" :key='index' @click="getInfo(index)">
                                    <div class="time">{{item.opTime}}</div>
                                    <div>识别站点：{{item.dzmc}}</div>
                                    <div>识别设备：{{item.devType}}</div>
                                    <div>操作人：{{item.opTeller}}</div>
                                    <div>报警原因：{{item.alarmReason}}</div>
                                    <div>报警原因描述：{{item.alarmReasonDesc}}</div>
                                </li>
                                <p v-if="loading">加载中...</p>
                                <p v-if="noMore">没有更多了</p>
                            </ul>
                            
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>


      
    </div>
</template>

<script>
    import irisRecordApi from "@/api/irisRecordApi";
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
            },
            uploadURL(){
                return (Vue.prototype.BASE_SERVER_API +'/upload/file');
            },
            noMore () {
                return this.returnData.length==0;
            },
            disabled () {
                return this.loading || this.noMore
            },
        },
        data(){
            return{
                face,
                eyeLeft,
                eyeRight,
                recordDetail:{
                    id:'',
                    name:'',
                    gender: '',
                    country:'',
                    nation:'',
                    age:'',
                    birthday:'',
                    cerType:'',
                    cerNo:'',
                    cerValid:'',
                    cerAuth:'',        
                    residenceAddr:'',      //户籍地址   
                    addr2:'',              //现住址
                    tel1 :'',       
                    tel2:'',
                    collTime:'',            //采集时间
                    collName:'',            //采集站点
                    collCoordinateX:'',     //采集点X
                    collCoordinateY:'',     //采集点Y
                    siteType:'',            //站点类型
                    collWorker:'',          //采集人
                    devType:'',             //采集设备
                    collReason:'',          //采集原因
                    collReasonDesc:'',      //采集原因描述
                    identityLabel:'',       //身份标签
                    flgForce:'',            //强制采集
                    flgWorker:'',           //工作对象
                    flgFocus:'',            //临时关注
                    flgFocusDesc:'',        //临时关注备注
                    endFocus:'',            //临时关注结束日期
                    collConsumption:'',     //采集耗时
                    irisLeft:'',            //左眼虹膜
                    irisRight:'',           //右眼虹膜
                    irisLeftQuality:'',     //左眼虹膜质量
                    irisRightQuality:'',    //右眼虹膜质量
                    facePath:'',            //人脸照片
                    securityLevel:'',       //人员安全级别
                    flgSync:'',             //同步标志
                    irId:'',
                },
                recordList:{
                        dzmc:'',            //识别站点
                        opTime:'',          //识别时间
                        opTeller:'',        //操作人
                        alarmReason:'',     //报警原因
                        alarmReasonDesc:'', //报警原因描述
                        jzTime:'',          //警综耗时
                        devType:'',         //识别设备
                    },
                pageNo:1,
                irId:'',
                loading: false,
                returnData:[],
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getDetail();
        },
        
        methods:{
            getInfo(index){
                let item = this.recordList[index];
                let that = this;
                that.recordDetail.dzmc=item.dzmc;
                that.recordDetail.opTime=item.opTime;
                that.recordDetail.devType=item.devType;
                that.recordDetail.opTeller=item.opTeller;
                that.recordDetail.alarmReason=item.alarmReason;
                that.recordDetail.alarmReasonDesc=item.alarmReasonDesc;
                that.recordDetail.jzTime=item.jzTime;
            },
            // 获取识别记录详情
            getDetail(){
                let that = this;
                let params = {
                        id: this.id,
                        pageNo:this.pageNo,
                    }
                irisRecordApi.detail(params)
                .then(function (res){
                    if(res.data.success && res.data.data){
                        that.recordDetail = res.data.data;
                        that.irId=that.recordDetail.irId;
                        that.recordList = res.data.data.recordList;
                        that.returnData = res.data.data.recordList;
                    }
                })
                .catch(function(res){
                    console.log('get Detail fail res :',res);
                });
            },
           load () {
                console.log('load')
                let that = this;
                console.log(that.pageNo);
                that.pageNo=that.pageNo+1;
                let params = {
                    irId:that.irId,
                    pageNo:that.pageNo,
                }
                that.loading = true
                 irisRecordApi.recordInfoList(params).then(function(res){
                    setTimeout(() => {
                        that.returnData=res.data.data.list;
                        var arr=that.recordList.concat(res.data.data.list);
                        that.recordList=arr;
                        that.loading = false;
                    }, 1000)
                })
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
        padding-left: 3%;
        padding-bottom: 15px;
    }
    .form-group>.el-col{
        text-align: left;
    }
    .form-item{
        text-align: left;
        line-height: 2;
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

    /*.label{*/
        /*width:130px;*/
        /*text-align: right;*/
        /*color: #7D7D7D;*/
        /*font-weight: bold;*/
    /*}*/
    /*.content{*/
        /*color: #7C7C7C;*/
    /*}*/
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
    .timeline-container{
        position: relative;

    }
    .timeline-container::before{
        content: '';
        position: absolute;
        top: 28px;
        margin: auto;
        left: 48px;
        width: 1px;
        height: 92%;
        background: #e2e1e6;
    }
    .timeline-item{
        margin-top: 15px;
        margin-right: 6%;
        position: relative;
        margin-left: 25px;
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
    .infinite-list {
        height: 100%;
        overflow: auto;
        margin: 0;
    }
</style>
