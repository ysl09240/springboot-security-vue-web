<template>
    <div class="app-container calendar-list-container el-dialog-bg" >
        <div class="feature-container">
            <div class="feature-wrap">
                <i class="icon-identify"></i>
                <i class="icon-identify left-down"></i>
                <img :src="validateForm.irisR?'data:image/bmp;base64,'+validateForm.irisR:eyeRight" class="avatar">
                <span class="tag">右眼虹膜</span>
            </div>
            <div class="feature-wrap">
                <i class="icon-identify right-up"></i>
                <i class="icon-identify right-down"></i>
                <img  :src="validateForm.irisL?'data:image/bmp;base64,'+validateForm.irisL:eyeLeft" class="avatar">
                <span class="tag">左眼虹膜</span>
           </div>
        </div>
        <div class="tip">请将眼睛对准镜头</div>
    </div>
</template>

<script>
    import infoApi from "@/api/infoApi";
    import irisRecordApi from "@/api/irisRecordApi";
    import eyeLeft from "@/assets/img/eye_left.png";
    import eyeRight from "@/assets/img/eye_right.png";
    import {isIdCard} from '@/utils/validate'
    import sessionUtil from "@/utils/sessionUtil";
    import Vue from 'vue'
    var loading;
    export default {
        name: "userDetail",
        computed:{
            headers(){
                return {
                    "token":sessionUtil.getItem('token')
                }
            },
            uploadURL(){
                return (Vue.prototype.BASE_SERVER_API +'/upload/file');
            }
        },
        data(){
            return{
                roleOptions: [],
                validateForm:{
                    irisR:"",
                    irisL:""
                },
                eyeLeft,
                eyeRight,
                rules: {
                },
                eyes:"3",
                userid:"",
                listQuery: {
                    pageIndex: 1,
                    pageSize: 1
                },
                tempUser:{
                    id:"",
                    userid:""
                }
            }
        },
        created() {
            this.getList();
            // this.deviceinit("registerIris");
            this.registerIris();
        },
        methods:{
              //注册虹膜 //用304/305注册
            registerIris(){
                // http://127.0.0.1:8001/iris_enroll_whole?id=1123&eye=both&return_img=1&json=1
                var that = this;
                that.openFullScreen();
                var eye = "both";
                switch (this.eyes) {
                    case "1":
                        eye = "left";
                        break;
                    case "2":
                        eye = "right";
                        break;
                    case "3":
                        eye = "both";
                        break;
                    default:
                        break;
                }
                var staffId = '1123';//that.validateForm.idcardNumber;
                var url =
                    Vue.prototype.URL_MDS +
                    "/iris_enroll_whole?id=" +
                    staffId + "&eye=" +eye +
                    "&return_img=1&json=1";
                 try{
                 that.$http.get(url).then(function (obj) {
                        // debugger;
                        var json = obj.data;
                        if (json.code == "6") {
                            var left="", right="";
                            //虹膜信息数据十六进制字符串左眼hexdata右眼hexdata左右之间用字符_分割 template.substring(1).split('_')
                            //that.validateForm.imageTemplate = template;
                            if(that.eyes == "3"){
                                that.validateForm.irisR = json.iris_img_right;
                                that.validateForm.irisL = json.iris_img_left;
                                left = json.iris_img_left;//左眼虹膜照片
                                right = json.iris_img_right;//右眼虹膜照片
                            }else if(that.eyes == "2"){
                                that.validateForm.irisR = json.rightimg;
                                right = json.rightimg;
                            }else if(that.eyes == "1"){
                                that.validateForm.irisL = json.leftimg;
                                left = json.leftimg;
                            }
                            that.$notify({
                                title: "成功",
                                message: "采集成功",
                                type: "success",
                                duration: 2000
                            });
                            that.validateForm.irisType = that.eyes;
                            var params = {
                                "eye_type": parseInt(that.eyes),
                                "left": left,
                                "right": right,
                                "unknow": ""
                            };
                            // that.irisCompariServer('/iris/image/recog',params);
                            that.irisCompariServer('/iris/image/recog',{"matcher":params});
                        } else if(json.code=="-6") {
                            loading.close();
                            that.$notify({
                                title: "失败",
                                message: "采集失败",
                                type: "warning",
                                duration: 2000
                            });
                        }
                    }); 
                }catch(e){
                    console.error(e)
                    that.$notify({
                        title: "失败",
                        message: "注册虹膜接口失败!",
                        type: "warning",
                        duration: 2000
                    });
                }  
            },
            getList() {
                let that = this;
                const param = this.listQuery;
                infoApi.list(param)
                    .then(function(res) {
                        if(res){
                            that.tempUser = res.data.data.list[0];
                        }
                    });
            },
             //虹膜特征比对服务
            irisCompariServer(url,params) {
                var that = this;
                var param ={
                    url:url,
                    data:JSON.stringify(params)
                };
                 infoApi.irisCompariServer(param)
                    .then(function (res) {
                        // debugger
                         if (res.data.success && res.data.data.length >0) {
                             var obj = $.parseJSON(res.data.data);
                             if(obj.result == 1 && obj.code == 1){
                                 that.eyes = String(obj.data.similarity.eye_type);
                                 that.validateForm.irisTemplateL = obj.data.similarity.left;//左眼虹膜模板数据信息
                                 that.validateForm.irisTemplateR = obj.data.similarity.right;//右眼虹膜模板数据信息
                                //  that.validateForm.qL = obj.data.quality.left;//左眼质量
                                //  that.validateForm.qR = obj.data.quality.right;//右眼质量
                                 var data ={
                                    // id:obj.data.userid,
                                    id:obj.data.userid?obj.data.userid:that.tempUser.id,
                                    // userid:obj.data.userid,
                                    userid:obj.data.userid?obj.data.userid:that.tempUser.id,
                                    flgEye:that.eyes
                                };
                                that.$router.push({name: "personDetail", params:data});
                             }else if(obj.result == 1 && obj.code == -1){
                                that.isConfirm();
                             }
                        } else {
                            that.$notify({
                                title: "识别失败",
                                message: res.data.msg,
                                type: "warning",
                                duration: 2000
                            });
                        }
                        loading.close();
                    })
                .catch(function (res) {
                    console.log(res);
                    that.deviceclose();
                });
            },
            //设备初始化
            deviceinit(type) {
                var that = this;
                this.openFullScreen();
                this.$http.get(Vue.prototype.URL_MDS+'/iris_enroll_whole?dev='+Vue.prototype.deviceK+'&json=1')
                    .then(function (response) {
                         if(response.ok){
                             if(type == 'registerIris'){
                                that.registerIris()
                                
                             }
                            //  if(type=='registerFace'){
                            //       that.registerFace()
                            //  }
                        }else{
                            //读取失败
                            that.$notify({
                                title: "失败",
                                message: "设备初始化失败!",
                                type: "warning",
                                duration: 2000
                            });
                        }
                        loading.close();
                }).catch(function (res) {
                    //读取失败
                    that.$notify({
                        title: "失败",
                        message: "设备初始化失败!",
                        type: "warning",
                        duration: 2000
                    });
                    loading.close();
                    that.deviceclose();
                });
               
            },
             //设备初始化
            cancelCaozuo() {
                var that = this;
                this.$http.get(Vue.prototype.URL_MDS+'/cancel?dev=sy308')
                    .then(function (response) {
                         if(response.ok){
                              that.registerIris()
                        }else{
                            //读取失败
                            that.$notify({
                                title: "失败",
                                message: "设备初始化失败!",
                                type: "warning",
                                duration: 2000
                            });
                        }
                })
               
            },
             //关闭设备
            deviceclose() {
                 var that = this;
                 loading.close();
                $.getScript(Vue.prototype.URL_MDS+'/closedev?dev='+Vue.prototype.deviceK, function () {
                    var json = $.parseJSON(obj.msg);
                    if(json.code == 3){
                        that.$notify({
                            title: "成功",
                            message: "关闭设备成功",
                            type: "success",
                            duration: 2000
                        });
                    }else{
                        //读取失败
                        that.$notify({
                            title: "失败",
                            message: json.info,
                            type: "warning",
                            duration: 2000
                        });
                    }
                })
            },
            //提交表单
            submit(){
                let that = this;
                
            },
            back(){
                this.$router.back(-1);
            },
            isEmpty(value){
                if(value == null || value == "" || value == "undefined" || value == undefined || value == "null"){
                    return true;
                }
                else{
                    value = value.replace(/\s/g,"");
                    if(value == ""){
                        return true;
                    }
                    return false;
                }
            },
            isConfirm(){
                this.$confirm('未查询到此人员信息，是否进行采集?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res =>{
                    this.$router.push({name: "personCollect"});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消采集'
                    });
                });
            },
            openFullScreen() {
                loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                // setTimeout(() => {
                //     loading.close();
                // }, 2000);
            }
        },
        beforeRouteLeave(to, from, next){
            var that = this;

            next(true);
            // 销毁

        }
    }
</script>

<style scoped lang="less">
    .feature-container{
        margin-top: 30px;
    }
    .feature-wrap{
        display: inline-block;
        margin-right:15px;
        margin-bottom: 20px;
        text-align: center;
        vertical-align: top;
        position: relative;
        .tag{
            background: #E5F2FA;
            color: #0084CF;
            border-radius: 20px;
            padding: 14px 0;
            margin: 25px 31%
        }
    }
    .avatar{
        width: 360px;
        height: 270px;
    }
    .feature-wrap>span{
        display: block;
    }
    .icon-identify{
        width: 20px;
        height: 4px;
        background: #0383CE;
        display: block;
        position: absolute;
        top: -12px;
        left: -12px;
    }
    .icon-identify::before{
        position: absolute;
        content: '';
        width: 4px;
        height: 18px;
        background: #0383CE;
        top: 0;
        left: 0;
    }
    .icon-identify.left-down{
        transform: rotateX(180deg);
        bottom: 85px;
        top: auto;
    }
    .icon-identify.right-up{
        transform: rotateY(180deg);
        right: -12px;
        left: auto;
    }
    .icon-identify.right-down{
        transform: rotate(180deg);
        bottom: 85px;
        top: auto;
        right: -12px;
        left: auto;
    }
    .tip{
        color: #0383CE;
        font-size: 36px;
        font-weight: 500;
    }
</style>
