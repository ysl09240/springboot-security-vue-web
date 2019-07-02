<template>
    <div class="app-container calendar-list-container el-dialog-bg" style="overflow: auto;">
        <el-form class="form-page"
                 label-position="left"
                 label-width="130px"
                 :model="validateForm"
                 ref="validateForm"
                 :rules="rules"
        >
            <!--证件信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle">证件信息</h3>
                </div>
                <div class="form-group">
                    <div style="display: flex">
                        <img :src="validateForm.headImage?validateForm.headImage:face" class="avatar">
                        <div >
                            <el-row>
                                <el-col :md="6" :lg="5">
                                    <el-form-item prop="jzCode"label="姓名：">
                                        <el-input placeholder="姓名" disabled="true" v-model="validateForm.sName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="5">
                                <el-form-item prop="cerNo" label="性别：">
                                        <el-input placeholder="性别" disabled="true" v-model="validateForm.sGender"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="5">
                                <el-form-item prop="cerNo" label="证件类型：">
                                        <el-input placeholder="证件类型" disabled="true" v-model="validateForm.cerTypeName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="7">
                                <el-form-item prop="cerNo" label="签发机关：">
                                        <el-input placeholder="签发机关" disabled="true" v-model="validateForm.cerAuth"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="5">
                                    <el-form-item prop="jzCode"label="国籍：">
                                        <el-input placeholder="国籍" disabled="true" v-model="validateForm.sCountry"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="5">
                                    <el-form-item prop="jzCode"label="年龄：">
                                        <el-input placeholder="年龄" disabled="true" v-model="validateForm.age"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="5">
                                    <el-form-item prop="jzCode"label="证件号码：">
                                        <el-input placeholder="证件号码" disabled="true" v-model="validateForm.cerNo"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="7">
                                    <el-form-item prop="jzCode"label="户籍地址：">
                                        <el-input placeholder="户籍地址" disabled="true" v-model="validateForm.addr1"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :md="6" :lg="5">
                                    <el-form-item prop="cerNo" label="民族：">
                                        <el-input placeholder="民族" disabled="true" v-model="validateForm.sNationName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="5">
                                    <el-form-item prop="cerNo" label="生日：">
                                        <el-input placeholder="生日" disabled="true" v-model="validateForm.sBirth"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="6" :lg="5">
                                    <el-form-item prop="cerNo" label="有效期：">
                                        <el-input placeholder="有效期" disabled="true" v-model="validateForm.cerValid"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </div>
                    </div>
                </div>
            </div>

            <!--其他信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle">其他信息</h3>
                </div>
                <div class="form-group other-info-container">
                    <el-row >
                        <el-col :span="14">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item prop="tel1" label="手机号1：">
                                        <el-input placeholder="请输入手机号1" v-model="validateForm.tel1"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="addr2" label="现住址：" :rules="[
                                                        {required: true, message: '请输入现住址',trigger: 'blur'},
                                                        {max: 100, message: '输入长度必须在1到100字之间', trigger: 'blur'},
                                                      ]">
                                        <el-input placeholder="请输入现住址" maxlength="100" v-model="validateForm.addr2"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="flgForce"
                                                  label="强制采集："
                                                  :rules="[
                                            {required: true, message: '请选择强制采集',trigger: 'blur'},
                                          ]"
                                    >
                                        <!--0:否 1:是-->
                                        <el-radio-group v-model="validateForm.flgForce">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="tel2" label="手机号2：">
                                        <el-input placeholder="请输入手机号2" v-model="validateForm.tel2"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="reasonColl" label="采集原因："
                                                  :rules="[
                                                    {required: true, message: '请选择采集原因',trigger: 'blur'},
                                                  ]">
                                        <el-select v-model="validateForm.reasonColl" placeholder="请选择采集原因">
                                            <el-option
                                                    v-for="item in reasonCollNames"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value"
                                            >
                                                <!--或者这样-->
                                                {{item.name}}
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="flgWo"
                                                  label="工作对象："
                                                  :rules="[
                                                    {required: true, message: '请选择工作对象',trigger: 'blur'},
                                                  ]"
                                    >
                                        <!--0:否 1:是-->
                                        <el-radio-group v-model="validateForm.flgWo">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="sSign" label="身份标签：" :rules="[
                                                        {required: true, message: '请输入身份标签',trigger: 'blur'},
                                                        {max: 20, message: '输入长度必须在1到20字之间', trigger: 'blur'},
                                                      ]">
                                        <el-input placeholder="身份标签"  maxlength="20"  v-model="validateForm.sSign"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="reasonCollDesc" label="采集原因描述："
                                                  :rules="[
                                                    {required: true, message: '请输入采集原因描述',trigger: 'blur'},
                                                  ]">
                                        <el-input placeholder="请输入采集原因描述" v-model="validateForm.reasonCollDesc"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item prop="flgFocus"
                                                  label="临时关注："
                                                  :rules="[
                                            {required: true, message: '请选择临时关注',trigger: 'blur'},
                                          ]"
                                    >
                                        <!--0:否 1:启用-->
                                        <el-radio-group v-model="validateForm.flgFocus">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8" class="gray-wrap" v-show="validateForm.flgFocus == 1">
                            <el-row>
                                <el-form-item prop="focusEndDate" label="临时关注结束日期：" label-width="150px"
                                              :rules="validateForm.flgFocus == 1?[{required: true, message: '请选择临时关注结束日期',trigger: 'blur'}]:[]">
                                    <!--<el-input placeholder="请输入用户名" v-model="validateForm.focusEndDate"></el-input>-->
                                    <el-date-picker v-model="validateForm.focusEndDate"
                                                    type="date"
                                                    placeholder="请选择临时关注结束日期"
                                                    :picker-options="pickerOptions"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="focusDesc" label="临时关注备注：" label-width="150px"
                                              :rules="validateForm.flgFocus == 1?[{required: true, message: '请输入临时关注备注',trigger: 'blur'}]:[]">
                                    <el-input placeholder="请输入用户名" v-model="validateForm.focusDesc"></el-input>
                                </el-form-item>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <!--证件信息-->
            <div class="">
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle">生物特征</h3>
                </div>
                <el-row class="form-group indent" style="padding-left: 5%;text-align: left">
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
                </el-row>
            </div>

            <div style="margin:40px 0;text-align: center" label-width="0">
                <el-button class="query-gray-icon" @click="back" type="warning" size="small" style="margin-right:40px;"> 取 消 </el-button>
                <el-button class="query-blue-icon" @click="submit" type="primary" size="small"> 保 存 </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import infoApi from "@/api/infoApi";
    import dictDataApi from "@/api/dictDataApi";
    import Treeselect from "@riophae/vue-treeselect";
    import {isIdCard} from '@/utils/validate'
    import {isPoneAvailable} from "@/utils/validate";
    import sessionUtil from "@/utils/sessionUtil";
    import face from "@/assets/img/face.png";
    import eyeLeft from "@/assets/img/eye_left.png";
    import eyeRight from "@/assets/img/eye_right.png";
    import IDHolder from "@/assets/img/ID.png";
    import IDBHolder from "@/assets/img/ID1.png";
    import PoliceHolder from "@/assets/img/Police.png";
    import PoliceBHolder from "@/assets/img/Police1.png";
    import Vue from 'vue'
    import roleApi from "@/api/roleApi";

    export default {
        name: "userDetail",
        components:{Treeselect},
        computed:{
            headers(){
                return {
                    "token":sessionUtil.getItem('token')
                }
            },
        },
        data(){
            var validate_tel = (rule, value, callback) => {
                if(value && !isPoneAvailable(value)){
                    callback(new Error('手机号码不符合规范'))
                }else{
                    callback()
                }
            };
            return{
                pickerOptions: {
                    disabledDate(time) {
                        return (time.getTime() < (Date.now() - 24*60*60*1000));
                    }
                },
                face,
                eyeLeft,
                eyeRight,
                IDHolder,
                IDBHolder,
                PoliceHolder,
                PoliceBHolder,
                type: 'edit',
                id: '',
                typeOptions: [],
                reasonCollNames: [],
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
                    reasonColl:'',
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
                rules: {
                    tel1:[
                        {validator:validate_tel, trigger:'blur'}
                    ],
                    tel2:[
                        {validator:validate_tel, trigger:'blur'}
                    ],
                },
                validate_cerF:true,
                validate_cerB:true,
                validate_jwB:true,
                validate_jwF:true,
            }
        },
        created() {
            this.type = this.$route.params.type;
            this.id = this.$route.params.id;
            this.getDetail();
            this.getDicteData('CERTIFICATES_TYPE,REASON_COLL');
        },
        methods:{
            getDicteData(types){
                var that = this;
                var param = {
                    type: types
                };
                dictDataApi.queryByTypes(param).then(function (res) {
                    that.typeOptions = res.data.data["CERTIFICATES_TYPE"] || [];
                    that.reasonCollNames = res.data.data["REASON_COLL"] || [];
                });
            },
            // 获取表单详情
            getDetail(){
                let that = this;
                if(this.type == 'edit'){
                    let params = {
                        id: this.id
                    }
                    infoApi.detail(params)
                        .then(function (res) {
                            console.log(res)
                            if(res.data.success && res.data.data){
                                that.validateForm = res.data.data;
                            }
                        })
                        .catch(function (res) {
                        });
                }
            },
            //提交表单
            submit(){
                let that = this;
                that.$refs['validateForm'].validate(valid => {
                    if (valid ) {
                        var params = that.validateForm;
                        infoApi.update(params)
                            .then(function (res) {
                                if (res.data.success) {
                                    that.$notify({
                                        title: "成功",
                                        message: "修改成功！",
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
                                    message: '请联系管理员',
                                    type: "warning",
                                    duration: 2000
                                });
                            });
                    } else {
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
            back(){
                this.$router.back(-1);
            },
        }
    }
</script>

<style scoped lang="less">
    @import "../../style/form.less";
    .el-radio{
        margin-right: 15px
    }
</style>
