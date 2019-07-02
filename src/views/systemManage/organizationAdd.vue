<template>
    <div class="app-container el-dialog-bg">
        <!-- 添加弹窗 新增页面  start-->
        <el-main class="mainDetail" style="margin: 10px 0 0 0;background: #fff;">
            <el-form label-position="left" label-width="120px" style='margin:0 6%;width:86%' :model="validateForm"
                     ref="validateForm" :rules="rules">
                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item prop="supCode" label="上级机构：">
                                <treeselect v-model="validateForm.supCode" 
                                             :options="addtreeData"
                                             value="label"
                                             placeholder="请选择上级机构"
                                             noResultsText="未找到结果..."
                                             :normalizer="normalizer"
                                             @select="deptSelect"/>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>

                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item prop="codeName" label="机构名称：">
                                <el-input placeholder="请输入机构名称" v-model="validateForm.codeName"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item prop="zzcode" label="公安机构代码:">
                                <el-input placeholder="请输入公安机构代码" v-model="validateForm.zzcode"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item prop="invalid" label="机构状态:">
                            <el-radio-group v-model="validateForm.invalid">
                                <el-radio label="1">启用</el-radio>
                                <el-radio label="0">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item prop="type" label="机构类别:">
                                <el-select filterable placeholder="请选择机构类别" v-model="validateForm.type">
                                    <el-option v-for="item in typeOptions"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item.value">
                                        {{item.name}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item prop="contract" label="机构电话:">
                            <el-input placeholder="机构电话" v-model="validateForm.contract"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item prop="phone" label="手机号码：">
                                <el-input placeholder="请输入手机号码" v-model="validateForm.phone"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item prop="sortid" label="显示排序：">
                            <el-select filterable placeholder="请选择显示排序" v-model="validateForm.sortid" :disabled="sortDisabled">
                                <el-option v-for="item in sortPptions"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item.id">
                                    {{item.name}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="机构区域:" prop="provinceId">
                            <el-select filterable placeholder="请选择省" v-model="validateForm.provinceId"
                                       @change="changeProvince" :disabled="isEditProvince">
                                <el-option v-for="item in provinces" :key="item.cityId" :label="item.city"
                                           :value="item.cityId">
                                    {{item.city}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item prop="cityId" label-width="0">
                            <el-select filterable placeholder="请选择市" v-model="validateForm.cityId" @change="changeCity"
                                       :disabled="isEditCity">
                                <el-option v-for="item in citys" :key="item.cityId" :label="item.city" :value="item.cityId">
                                    {{item.city}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item prop="areaId" label-width="0">
                            <el-select filterable placeholder="请选择区"
                                       v-model="validateForm.areaId"
                                       :disabled="isEditCounty">
                                <el-option v-for="item in countys" :key="item.cityId" :label="item.city"
                                           :value="item.cityId">
                                    {{item.city}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="longitude" label="机构坐标:" class="latitude">
                            <el-input  v-model="validateForm.longitude"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">,</el-col>
                    <el-col :span="4">
                        <el-form-item prop="latitude" label-width="0" class="latitude">
                            <el-input  v-model="validateForm.latitude"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item prop="address" label="详细地址:" class="latitude">
                                <el-input placeholder="请输入详细地址" v-model="validateForm.address"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item label="备注：" prop="codeAbr">
                    <el-input type="textarea" v-model="validateForm.codeAbr"></el-input>
                </el-form-item>

                <div style="margin-top:40px">
                    <el-button type="warning" @click="back"  class="query-gray-icon"  size="small" style="margin-right:40px;"> 取 消 </el-button>
                    <el-button type="primary" @click="submit('validateForm')" class="query-blue-icon" size="small"> 保 存 </el-button>
                </div>
            </el-form>
        </el-main>
    </div>
    
</template>

<script>
    import Treeselect from "@riophae/vue-treeselect";
    import orgApi from "@/api/orgApi";
    import cityApi from "@/api/cityApi";
    import dictDataApi from "@/api/dictDataApi";
    import {isPoneAvailable } from "@/utils/validate";

    export default {
        name: "organizationAdd",
        components: {Treeselect},
        data(){
            var validateName = (rule, value, callback) => {
                var that = this;
                if (value != null && value != "") {
                    const myreg = /^[a-zA-Z\d]+$/;
                    if (value) {
                        if (!myreg.test(value)) {
                            callback(new Error("请输入正确的公安机构代码"));
                        } else {
                            var params = {
                                'id': that.validateForm.code,
                                'name': "zzcode",
                                'value': value
                            };
                            orgApi
                                .checkUnique(params)
                                .then(function(res) {
                                    if (!res.data.data) {
                                        callback();
                                    } else {
                                        callback(new Error("公安机构代码已存在"));
                                    }
                                })
                                .catch(function(res) {
                                    callback();
                                });
                        }
                    } else {
                        callback();
                    }
                   
                } else {
                    callback();
                }
            };
            var validateCodeName = (rule, value, callback) => {
                var that = this;
                if (value != null && value != "") {
                    var params = {
                        'id': that.validateForm.code,
                        'name': "code_name",
                        'value': value
                    };
                    orgApi
                        .checkUnique(params)
                        .then(function(res) {
                            if (!res.data.data) {
                                callback();
                            } else {
                                callback(new Error("机构名称已存在"));
                            }
                        })
                        .catch(function(res) {
                            console.log(res);
                        });
                } else {
                    callback();
                }
            };
            var IsPoneAvailable = (rule, value, callback) => {
                var that = this;
                if (value != null && value != "") {
                    if (!isPoneAvailable(value)) {
                        callback(new Error("格式不正确"));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return{
                addtreeData:[],
                sortPptions:[],
                typeOptions:[],
                isEditProvince:false,
                isEditCity:false,
                isEditCounty:false,
                provinces:[],
                citys:[],
                countys:[],
                sortDisabled:true,
                validateForm:{
                    code: '',
                    zzcode: '',
                    codeSpelling: '',
                    codeName: '',
                    codeAbr: '',
                    address: '',
                    contract: '',
                    phone: '',
                    supCode: null,
                    supName: '',
                    invalid: '1',
                    sortid: '',
                    ext1: '',
                    ext2: '',
                    type: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    website:'',
                    longitude:null,
                    latitude:null,
                },
                contrl:'add',
                rules: {
                    supCode:[
                        {
                            required: true,
                            message: "上级机构不能为空",
                            trigger: "blur"
                        }
                    ],
                    zzcode: [
                        {
                            validator: validateName,
                            trigger: "blur"
                        },
                        {
                            required: true,
                            message: "公安机构代码不能为空",
                            trigger: "blur"
                        },
                        {
                            min: 12,
                            max: 12,
                            message: "公安机构代码必须是12个字符",
                            trigger: "blur"
                        }
                    ],
                    provinceId:[
                        {
                            required: true,
                            message: "省不能为空",
                            trigger: "blur"
                        },
                    ],
                    cityId:[
                        {
                            required: true,
                            message: "市不能为空",
                            trigger: "blur"
                        },
                    ],
                    areaId:[
                        {
                            required: true,
                            message: "区不能为空",
                            trigger: "blur"
                        },
                    ],
                    codeName: [
                        {
                            required: true,
                            message: "机构名称不能为空",
                            trigger: "blur"
                        },
                        {
                            validator: validateCodeName,
                            trigger: "blur"
                        },
                        {
                            min: 1,
                            max: 20,
                            message: "机构名称必须在1~20个字符之间",
                            trigger: "blur"
                        }
                    ],
                    address: [
                        {
                            required: true,
                            message: "详细地址不能为空",
                            trigger: "blur"
                        },
                        {
                            min: 1,
                            max: 50,
                            message: "输入长度必须在1~50个字符之间",
                            trigger: "blur"
                        }
                    ],
                    contract: [
                         {
                            min: 1,
                            max: 13,
                            message: "输入长度必须在1~13个字符之间",
                            trigger: "blur"
                        },
                        {
                            required: true,
                            message: "机构电话不能为空",
                            trigger: "blur"
                        },
                        {
                            trigger:  "blur",
                            validator: (rule, value, callback) => {
                                const zj = /0\d{2,3}-\d{7,8}/;
                                const sj = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                                if (value) {
                                    if (!sj.test(value)) {
                                        if (!zj.test(value)) {
                                            callback(new Error("请输入正确的座机号码"));
                                        }else{
                                            callback();
                                        }
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    phone: [
                        {
                            max: 11,
                            message: "输入长度不得超过11字符",
                            trigger: "blur"
                        },
                        {
                            validator: IsPoneAvailable,
                            trigger: "blur"
                        }
                    ],
                    invalid: [
                        {
                            required: true,
                            message: "机构状态不能为空",
                            trigger: "blur"
                        }
                    ],
                    sortid: [
                        {
                            required: true,
                            message: "显示排序不能为空",
                            trigger: "blur"
                        }
                    ],
                    type: [
                        {
                            required: true,
                            message: "机构类别不能为空",
                            trigger: "blur"
                        }
                    ],
                    longitude:[
                        {
                            required: true,
                            message: "请输入经度",
                            trigger: "blur"
                        },
                        {
                            trigger:  "blur",
                            validator: (rule, value, callback) => {
                                const myreg = /^[\-\+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/;
                                if (value) {
                                    if (!myreg.test(value)) {
                                        callback(new Error("请输入正确的经度,例如：-180.0～+180.0"));
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    latitude:[
                        {
                            required: true,
                            message: "请输入纬度",
                            trigger: "blur"
                        },
                        {
                            trigger: "blur",
                            validator: (rule, value, callback) => {
                                const myreg = /^[\-\+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
                                if (value) {
                                    if (!myreg.test(value)) {
                                        callback(new Error("请输入正确的纬度,例如：-90.0～+90.0"));
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    codeAbr:[
                        {
                            max: 100,
                            message: "输入长度不得超过100字",
                            trigger: "blur"
                        }
                    ]
                    
                }
            }
        },
        created(){
            this.contrl = this.$route.params.type;
            if(this.contrl == 'edit'){
                this.editData(this.$route.params.id);
                this.getParentTree(this.$route.params.id);
            }else{
                this.getParentTree();
            }
            this.getFirstCityList();
            this.getDicteData('SITE_TYPE');
        },
        methods:{
            getDicteData(types){
                var that = this;
                var param = {
                    type: types
                };
                dictDataApi.queryByTypes(param).then(function (res) {
                    that.typeOptions = res.data.data["SITE_TYPE"];
                });
            },
            editData(id){
                var that = this;
                var param = {id:id}
                orgApi.detail(param)
                    .then(function(res) {
                        that.getSortList(res.data.data.supCode);
                        that.changeProvince(res.data.data.provinceId);
                        that.changeCity(res.data.data.cityId);
                        that.validateForm = res.data.data;
                        that.validateForm.longitude = Number.isInteger(that.validateForm.longitude)?that.validateForm.longitude + '.0':that.validateForm.longitude;
                        that.validateForm.latitude = Number.isInteger(that.validateForm.latitude)?that.validateForm.latitude + '.0':that.validateForm.latitude;
                    })
                    .catch(function(res) {
                        console.log('gettree fail res :',res);
                    });
            },
            getParentTree(id){
                var that = this;
                var params = {
                    'id':id
                };
                orgApi.tree(params)
                    .then(function(res) {
                        var arr = new Array();
                        arr.push(res.data.data);
                        that.addtreeData = arr;
                        console.log('gettree success res :',arr);
                    })
                    .catch(function(res) {
                        console.log('gettree fail res :',res);
                    });
            },
            normalizer(node){
                if(node.children==null ||node.children.length==0 ){
                    delete node.children;
                }
                return node;

            },
            deptSelect(node){
               this.getSortList(node.id);
               this.sortDisabled = false;
            },
            getSortList(deptId){
                var that = this;
                var params = {
                    'id' : deptId
                }
                orgApi.getSortList(params)
                .then(function(res) {
                    that.sortPptions = res.data.data;
                })
                .catch(function(res) {
                    console.log('gettree fail res :',res);
                });
            },
            //地址变更
            changeProvince(provinceId) {
                var that = this;
                that.citys = [];
                that.validateForm.cityId = "";
                that.countys = [];
                that.validateForm.areaId = "";
                that.getChildCityList(2, provinceId);
            },
            changeCity(cityId) {
                var that = this;
                that.countys = [];
                that.validateForm.areaId = "";
                that.getChildCityList(3, cityId);
            },
            getChildCityList(level, cityId) {
                var that = this;
                var param = {
                    parentCityId: cityId
                };
                cityApi.queryChildCityById(param).then(function(res) {
                    if (level == 2) {
                        that.citys = res.data.data;
                    } else if (level == 3) {
                        that.countys = res.data.data;
                    }
                });
            },
            //查询省市区级联
            getFirstCityList() {
                var that = this;
                var param = {
                    level: 1
                };
                cityApi.queryCityByLevel(param).then(function(res) {
                    that.provinces = res.data.data;
                });
            },
            submit(){
                let that = this;
                that.$refs['validateForm'].validate(valid => {
                    if (valid) {
                        var params = that.validateForm;
                        if(that.contrl == 'add'){
                            orgApi.add(params)
                                .then(function (res) {
                                    if (res.data.success) {
                                        that.$notify({
                                            title: "成功",
                                            message: '保存成功',
                                            type: "success",
                                            duration: 2000
                                        });
                                        that.back();
                                    } else {
                                        that.$notify({
                                            title: "失败",
                                            message: '保存失败',
                                            type: "warning",
                                            duration: 2000
                                        });
                                    }
                                })
                                .catch(function (res) {
                                    that.$notify({
                                        title: "失败",
                                        message: '保存失败',
                                        type: "warning",
                                        duration: 2000
                                    });
                                });
                        }else if(that.contrl == 'edit'){
                            orgApi.update(params)
                                .then(function (res) {
                                    if (res.data.success) {
                                        that.$notify({
                                            title: "成功",
                                            message: '保存成功',
                                            type: "success",
                                            duration: 2000
                                        });
                                        that.back();
                                    } else {
                                        that.$notify({
                                            title: "失败",
                                            message: '保存失败',
                                            type: "warning",
                                            duration: 2000
                                        });
                                    }
                                })
                                .catch(function (res) {
                                    that.$notify({
                                        title: "失败",
                                        message: '保存失败',
                                        type: "warning",
                                        duration: 2000
                                    });
                                });   
                        } 
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

<style scoped>
    .latitude{
        margin-bottom: 29px;
    }
</style>