<template>
    <div class="app-container calendar-list-container el-dialog-bg" style="overflow: auto;">
        <div class="stepBox clearfix">
            <div :class="['stepItem',{'active':step ==1},{'done':step != 1}]" @click="changeStep(1)">
                <i class="">1</i>
                <span class="c_fff">基础信息</span>
            </div>
            <div :class="['stepItem',{'active':step ==2}]" @click="changeStep(2)">
                <i class="">2</i>
                <span class="c_fff">生物特征</span>
            </div>
            <div :class="['stepItem',{'active':step ==3}]">
                <i class="">3</i>
                <span class="c_fff">添加成功</span>
            </div>
        </div>
        <div class="form-page" v-show="step == 1">
            <el-form
                    label-position="left"
                    label-width="100px"
                    :model="validateForm"
                    ref="validateForm1"
                    :rules="rules"
            >
                <!--证件信息-->
                <div>
                    <div class="grid-content bg-purple-dark" >
                        <h3 class="dialogTitle">证件信息</h3>
                    </div>
                    <div class="form-group">
                        <div class="tip">说明：请将证件放置在读卡器上，点击[读取证件信息]按钮。若无证件，可输入证件号码后点击[获取身份信息]按钮进行查询</div>
                        <!--<div class="tab-container clearfix">-->
                            <!--<div :class="['tab',{'active':readCer}]" @click="readCer = true"> 通过证件读取 </div>-->
                            <!--<div :class="['tab',{'active':!readCer}]" @click="search" > 根据号码查询 </div>-->
                        <!--</div>-->

                        <div v-if="readCer || (!readCer && cerInfoVisible)" class="grid-wrap" >
                            <img v-if="validateForm.headImage" :src="'data:image/jpeg;base64,'+validateForm.headImage" class="avatar">
                            <i v-else class="avatar">
                                <img :src="face" >
                            </i>
                            <div >
                                <el-row>
                                    <el-col :span="5">
                                        <el-form-item prop="sName" label="姓名：">
                                            <el-input placeholder="姓名" v-model="validateForm.sName" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="sGender" label="性别：" label-width="80px">
                                            <el-input placeholder="性别" v-model="validateForm.sGender" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item prop="cerType" label="证件类型：">
                                            <el-select v-model="validateForm.cerType" placeholder="请选择证件类型">
                                                <el-option
                                                        v-for="item in typeOptions"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.value"
                                                >
                                                    <!--或者这样-->
                                                    {{item.name}}
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item prop="cerAuth" label="签发机关：">
                                            <el-input placeholder="签发机关" v-model="validateForm.cerAuth" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="sCountry" label="国籍：">
                                            <el-input placeholder="国籍" v-model="validateForm.sCountry" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="age" label="年龄：" label-width="80px">
                                            <el-input placeholder="年龄" v-model="validateForm.age" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item prop="cerNo"label="证件号码：">
                                            <el-input placeholder="证件号码" v-model="validateForm.cerNo" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item prop="addr1"label="户籍地址：">
                                            <el-input placeholder="户籍地址" v-model="validateForm.addr1" disabled></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="5">
                                        <el-form-item prop="sNation" label="民族：">
                                            <el-input placeholder="民族" v-model="validateForm.sNation" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="birthDate" label="生日：" label-width="80px">
                                            <el-input placeholder="生日" v-model="validateForm.birthDate" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item prop="cerValid" label="有效期限：">
                                            <el-input placeholder="有效期限" v-model="validateForm.cerValid" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </div>
                        </div>
                        <el-form v-else
                                 label-position="left"
                                 label-width="120px"
                                 class="dialog-form"
                                 :model="validateForm_cer"
                                 ref="validateForm_cer"
                        >
                            <el-row>
                                <el-col :span="8" :offset="8">
                                    <el-form-item prop="idcardNumber"
                                                  label="证件号码："
                                                  :rules="[{required:true,message:'请输入证件号码'}]"
                                    >
                                        <el-input placeholder v-model="validateForm_cer.idcardNumber"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <!--button-->
                        <div class="form-group-footer">
                            <!-- <span>读取证件设备类型：</span>
                            <el-select v-model="cardtype" class="card-type" style="width: 120px;">
                                <el-option label="中控" value="idm30"></el-option>
                                <el-option label="精伦" value="idr210" selected="selected"></el-option>
                            </el-select> -->
                            <el-button v-if="readCer" class="query-blue-icon" @click="readCard" type="primary" size="small"> 读取证件信息 </el-button>
                        </div>
                        <template v-if="!readCer">
                            <el-button v-if="cerInfoVisible" class="query-blue-icon" @click="reset" type="primary" size="small"> 重新输入号码 </el-button>
                            <el-button v-else class="query-blue-icon" @click="searchByNum('dialogValidateForm')" type="primary" size="small"> 根据号码查询 </el-button>
                        </template>
                    </div>
                </div>

                <!--其他信息-->
                <div>
                    <div class="grid-content bg-purple-dark" >
                        <h3 class="dialogTitle">其他信息</h3>
                    </div>
                    <div class="form-group other-info-container">
                        <div class="tip">说明：请填写其他信息</div>
                        <el-row >
                            <el-col :lg="16" :md="24">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item prop="tel1" label="手机号1：">
                                            <el-input placeholder="请输入手机号1" v-model="validateForm.tel1"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item prop="addr2"
                                                      label="现住址："
                                                      label-width="120px"
                                                      :rules="[
                                                        {required: true, message: '请输入现住址',trigger: 'blur'},
                                                        {max: 100, message: '输入长度必须在1到100字之间', trigger: 'blur'},
                                                      ]"
                                        >
                                            <el-input placeholder="请输入现住址" v-model="validateForm.addr2"></el-input>
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
                                        <el-form-item prop="reasonColl"
                                                      label="采集原因："
                                                      label-width="120px"
                                                      :rules="[
                                                        {required: true, message: '请选择采集原因'},
                                                      ]"
                                        >
                                            <el-select v-model="validateForm.reasonColl" placeholder="请选择采集原因">
                                                <el-option
                                                        v-for="item in reasonOptions"
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
                                                <el-radio :label="1">是</el-radio>
                                                <el-radio :label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item prop="sSign"
                                                      label="身份标签："
                                                      :rules="[
                                                        {required: true, message: '请输入身份标签',trigger: 'blur'},
                                                        {max: 20, message: '输入长度必须在1到20字之间', trigger: 'blur'},
                                                      ]"
                                        >
                                            <el-input placeholder="身份标签" v-model="validateForm.sSign"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item prop="reasonCollDesc"
                                                      label="采集原因描述："
                                                      label-width="120px"
                                                      :rules="[
                                                        {required: true, message: '请输入采集原因描述',trigger: 'blur'},
                                                        {max: 100, message: '输入长度必须在1到100字之间', trigger: 'blur'},
                                                      ]"
                                        >
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
                                                <el-radio :label="1">是</el-radio>
                                                <el-radio :label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <!--<el-col :span="8">-->
                                        <!--<el-form-item prop="flgBind"-->
                                                      <!--label="是否绑定："-->
                                                      <!--:rules="[-->
                                                        <!--{required: true, message: '请选择是否绑定',trigger: 'blur'},-->
                                                      <!--]"-->
                                        <!--&gt;-->
                                            <!--&lt;!&ndash;0:否 1:启用&ndash;&gt;-->
                                            <!--<el-radio-group v-model="validateForm.flgBind">-->
                                                <!--<el-radio :label="1">是</el-radio>-->
                                                <!--<el-radio :label="0">否</el-radio>-->
                                            <!--</el-radio-group>-->
                                        <!--</el-form-item>-->
                                    <!--</el-col>-->
                                </el-row>
                            </el-col>
                            <el-col :span="8" class="gray-wrap" v-show="validateForm.flgFocus == 1">
                                <el-row>
                                    <el-form-item prop="focusEndDate"
                                                  label="临时关注结束日期："
                                                  label-width="150px"
                                                  :rules="validateForm.flgFocus == 1?[{required: true, message: '请选择临时关注结束日期',trigger: 'blur'}]:[]"
                                    >
                                        <el-date-picker v-model="validateForm.focusEndDate"
                                                        type="date"
                                                        format="yyyy-MM-dd"
                                                        value-format="yyyy-MM-dd"
                                                        placeholder="请选择临时关注结束日期"
                                                        :picker-options="pickerOptions"
                                        >
                                        </el-date-picker>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="focusDesc"
                                                  label="临时关注备注："
                                                  label-width="150px"
                                                  :rules="validateForm.flgFocus == 1?[{required: true, message: '请输入临时关注备注',trigger: 'blur'}]:[]"
                                    >
                                        <el-input placeholder="请输入临时关注备注" v-model="validateForm.focusDesc"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="btns-container">
                    <el-button class="query-blue-icon" @click="changeStep(2)" type="primary" size="small"> 下一步 </el-button>
                </div>
            </el-form>
        </div>

        <div class="form-page" v-show="step == 2">
            <el-form
                    label-position="left"
                    label-width="110px"
                    :model="validateForm"
                    ref="validateForm2"
                    :rules="rules"
            >
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle">证件信息</h3>
                </div>
                <el-row class="form-group indent" style="padding-left: 5%;text-align: left">
                    <el-col :span="12" class="feature-container">
                        <div>
                            <div class="feature-wrap">
                                <img :src="validateForm.irisR?'data:image/bmp;base64,' + validateForm.irisR:eyeRight" class="avatar">
                                <span class="tag">右眼虹膜</span>
                                <span v-if="validateForm.qR < 75" class="tip-warn">质量：低</span>
                                <span v-else-if="validateForm.qR > 74 && validateForm.qR < 90" class="tip-warn">质量：中</span>
                                <span v-else-if="validateForm.qR > 89" class="tip-success">质量：高</span>
                            </div>
                            <div class="feature-wrap">
                                <img :src="validateForm.irisL?'data:image/bmp;base64,'+validateForm.irisL:eyeLeft" class="avatar">
                                <span class="tag">左眼虹膜</span>
                                <span v-if="validateForm.qL < 75" class="tip-warn">质量：低</span>
                                <span v-else-if="validateForm.qL > 74 && validateForm.qL < 90" class="tip-warn">质量：中</span>
                                <span v-else-if="validateForm.qL > 89" class="tip-success">质量：高</span>
                            </div>
                        </div>
                        <div>
                            <el-select v-model="eyes" class="eyes" @change="cleareyes">
                                <el-option label="左眼" value="1"></el-option>
                                <el-option label="右眼" value="2"></el-option>
                                <el-option label="双眼" value="3" selected="selected"></el-option>
                                <!-- <el-option label="单眼" value="4" ></el-option> -->
                            </el-select>
                            <el-button class="query-blue-icon" type="primary" round @click="registerIris">注册虹膜</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6" class="feature-container">
                        <div>
                            <div class="feature-wrap">
                                <img :src="validateForm.irisFace?'data:image/bmp;base64,'+ validateForm.irisFace:face" class="avatar">
                                <span class="tag">人脸照片</span>
                            </div>
                        </div>
                        <div>
                            <el-button class="query-blue-icon" type="primary" round @click="playvideo">视频播放</el-button>
                            <el-button class="query-blue-icon" type="primary" round @click="registerFace">人脸拍照</el-button>
                        </div>
                    </el-col>
                </el-row>
                <div style="margin:40px 0;text-align: center" label-width="0">
                    <el-button class="" @click="changeStep(1)" type="info" size="small"> 上一步 </el-button>
                    <el-button class="query-blue-icon" @click="submit" type="primary" size="small" :disabled="isQuering"> 保存 </el-button>
                </div>
            </el-form>
        </div>

        <!--采集信息重复，信息详情弹窗 start-->
        <el-dialog :visible.sync="dialogVisible_deatil" width="50%" title="重复采集" custom-class="custom" class="detail-dialog">
            <!--人员信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">人员信息</h3>
                </div>
                <el-row class="form-group">
                    <el-col :span="5">
                        <img :src="validateForm_detail.headImage?validateForm_detail.headImage:face" class="avatar">
                    </el-col>
                    <el-col :span="19">
                        <el-row>
                            <el-col :span="12" class="form-item">
                                <div class="label">姓名：</div>
                                <div class="content">{{validateForm_detail.sName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">证件类型：</div>
                                <div class="content">{{validateForm_detail.cerTypeName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">国籍：</div>
                                <div class="content">{{validateForm_detail.sCountry}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">证件号码：</div>
                                <div class="content">{{validateForm_detail.cerNo}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">民族：</div>
                                <div class="content">{{validateForm_detail.sNationName}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">有效期限：</div>
                                <div class="content">{{validateForm_detail.cerValid}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">性别：</div>
                                <div class="content">{{validateForm_detail.sGender}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">签发机关：</div>
                                <div class="content">{{validateForm_detail.cerAuth}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">年龄：</div>
                                <div class="content">{{validateForm_detail.age}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">户籍地址：</div>
                                <div class="content">{{validateForm_detail.addr1}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">生日：</div>
                                <div class="content">{{validateForm_detail.sBirth}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">居住地址：</div>
                                <div class="content">{{validateForm_detail.addr2}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">手机号码1：</div>
                                <div class="content">{{validateForm_detail.tel1}}</div>
                            </el-col>
                            <el-col :span="12" class="form-item">
                                <div class="label">手机号码2：</div>
                                <div class="content">{{validateForm_detail.tel2}}</div>
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
                <el-row class="form-group">
                    <el-col :span="8" class="form-item">
                        <div class="label">采集时间：</div>
                        <div class="content">{{validateForm_detail.createTime}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">采集人：</div>
                        <div class="content">{{validateForm_detail.createUserName}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">身份标签：</div>
                        <div class="content">{{validateForm_detail.sSign}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">临时关注备注：</div>
                        <div class="content">{{validateForm_detail.focusDesc}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">采集站点：</div>
                        <div class="content">{{validateForm_detail.stName}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">采集设备：</div>
                        <div class="content">{{validateForm_detail.devTypeName}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">强制采集：</div>
                        <div class="content">{{validateForm_detail.flgForce==1?'是':'否'}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">临时关注结束日期：</div>
                        <div class="content">{{validateForm_detail.focusEndDate}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">采集点坐标：</div>
                        <div class="content">{{validateForm_detail.stCoordinate}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">采集原因：</div>
                        <div class="content">{{validateForm_detail.reasonCollName}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">工作对象：</div>
                        <div class="content">{{validateForm_detail.flgWo==1?'是':'否'}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">站点类型：</div>
                        <div class="content">{{validateForm_detail.stTypeName}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">采集原因描述：</div>
                        <div class="content">{{validateForm_detail.reasonCollDesc}}</div>
                    </el-col>
                    <el-col :span="8" class="form-item">
                        <div class="label">临时关注：</div>
                        <div class="content">{{validateForm_detail.flgFocus==1?'是':'否'}}</div>
                    </el-col>
                </el-row>
            </div>

            <!--识别信息-->
            <div>
                <div class="grid-content bg-purple-dark" >
                    <h3 class="dialogTitle" style="margin-top:0">生物特征</h3>
                </div>
                <el-row class="form-group">
                    <div class="feature-wrap">
                        <img :src="validateForm_detail.irisR?validateForm_detail.irisR:eyeRight" class="avatar">
                        <span class="tag">右眼虹膜</span>
                        <span v-if="validateForm_detail.qR < 75" class="tip-warn">质量：低</span>
                        <span v-else-if="validateForm_detail.qR > 74 && validateForm_detail.qR < 90" class="tip-warn">质量：中</span>
                        <span v-else-if="validateForm_detail.qR > 89" class="tip-success">质量：高</span>
                        <!--<span class="tip-warn">质量：高</span>-->
                    </div>
                    <div class="feature-wrap">
                        <img :src="validateForm_detail.irisL?validateForm_detail.irisL:eyeLeft" class="avatar">
                        <span class="tag">左眼虹膜</span>
                        <span v-if="validateForm_detail.qL < 75" class="tip-warn">质量：低</span>
                        <span v-else-if="validateForm_detail.qL > 74 && validateForm_detail.qL < 90" class="tip-warn">质量：中</span>
                        <span v-else-if="validateForm_detail.qL > 89" class="tip-success">质量：高</span>
                        <!--<span class="tip-success">质量：高</span>-->
                    </div>
                    <div class="feature-wrap">
                        <img :src="validateForm_detail.irisFace?validateForm_detail.irisFace:face" class="avatar">
                        <span class="tag">人脸照片</span>
                    </div>
                </el-row>
            </div>
            <div class="btns-container">
                <el-button class="query-blue-icon" @click="toDetail" type="primary" > 确 定 </el-button>
            </div>
        </el-dialog>


        <!-- 保存成功弹窗 -->
        <el-dialog :visible.sync="dialogVisible_success"
                   width="25%"
                   title="提示"
                   @close="continueAdd"
        >
            <div class="dialog-content">保存成功 !</div>
            <span slot="footer" class="dialog-footer">
                <el-button class="query-blue-icon" size="small" type="primary" @click="continueAdd">继续添加</el-button>
                <el-button class="query-blue-icon" size="small" type="primary" @click="toDetail">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import infoApi from "@/api/infoApi";
    import dictDataApi from "@/api/dictDataApi";
    import Treeselect from "@riophae/vue-treeselect";
    import {isIdCard} from '@/utils/validate'
    import {isPoneAvailable} from "@/utils/validate";
    import face from "@/assets/img/face.png";
    import eyeLeft from "@/assets/img/eye_left.png";
    import eyeRight from "@/assets/img/eye_right.png";
    import Vue from 'vue'
    var loading;

    export default {
        name: "userDetail",
        components:{Treeselect},
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
                step:1,
                readCer:true,       //是否设备读取证件信息
                cerInfoVisible:false,    //是否显示证件表单
                typeOptions:[],
                reasonOptions: [],
                nationOptions:[],
                eyes: "3",
               // cardtype:"idr210",
                isQuering:false,
                validateCerNo:false,    //身份证号验证标识
                validateForm:{
                    headImage:'',
                    sName:'',
                    sGender:'',
                    cerType:'',
                    cerAuth:'',
                    sCountry:'中国',
                    age:'',
                    cerNo:'142602199205195024',
                    addr1:'',
                    sNation:'',
                    birthDate:'2015-10-02',
                    cerValid:'2015-10-02至2015-10-02',

                    tel1:'',
                    addr2:'',
                    flgForce:'',
                    tel2:'',
                    reasonColl:'',
                    flgWo:'',
                    sSign:'',
                    reasonCollDesc:'',
                    flgFocus:'',
                    flgBind:'',
                    focusEndDate:'',
                    focusDesc:'',

                    //305注册
                    irisFace: "", //人脸数据
                    templateL: "", //左眼虹膜模板数据信息
                    templateR: "", //右眼虹膜模板数据信息a
                    irisL: "", //左眼数据
                    irisR: "", //右眼数据
                    irisType:'',    //虹膜模板类型
                    qL:"",//左眼质量
                    qR:"",//右眼质量
                },
                rules: {
                    tel1:[
                        {validator:validate_tel, trigger:'blur'}
                    ],
                    tel2:[
                        {validator:validate_tel, trigger:'blur'}
                    ],
                },
                validateForm_cer:{
                    idcardNumber:'',
                },

                repeatID:'',    //保存成功、重复时返回的用户id
                dialogVisible_success:false,
                //重复采集弹窗
                dialogVisible_deatil:false,
                validateForm_detail:{
                    headImage:'',
                    sName:'',
                    sGender:'',
                    cerType:'',
                    cerAuth:'',
                    sCountry:'中国',
                    age:'',
                    cerNo:'',
                    addr1:'',
                    sNation:'',
                    sBirth:'',
                    cerValid:'',

                    tel1:'',
                    addr2:'',
                    flgForce:'',
                    tel2:'',
                    reasonColl:'',
                    flgWo:'',
                    sSign:'',
                    reasonCollDesc:'',
                    flgFocus:'',
                    flgBind:'',
                    focusEndDate:'',
                    focusDesc:'',

                    //305注册
                    irisFace: "", //人脸数据
                    templateL: "", //左眼虹膜模板数据信息
                    templateR: "", //右眼虹膜模板数据信息a
                    irisL: "", //左眼数据
                    irisR: "", //右眼数据
                    irisType:'',    //虹膜模板类型
                    qL:"",//左眼质量
                    qR:"",//右眼质量
                },
            }
        },
        created() {
            this.getDicteData('CERTIFICATES_TYPE,REASON_COLL,NATION_TYPE');
        },
        methods:{
            getDicteData(types){
                var that = this;
                var param = {
                    type: types
                };
                dictDataApi.queryByTypes(param).then(function (res) {
                    console.log('>>>>>>>>>>>>>>>>>>>dictDataApi.queryByTypes res,',res)
                    that.typeOptions = res.data.data["CERTIFICATES_TYPE"] || [];
                    that.reasonOptions = res.data.data["REASON_COLL"] || [];
                    that.nationOptions = res.data.data["NATION_TYPE"] || [];
                });
            },
            cleareyes(){
                var that = this;
                that.validateForm.irisL="";
                that.validateForm.irisR="";
                that.validateForm.templateL="";
                that.validateForm.templateR="";
                that.validateForm.qL="";
                that.validateForm.qR="";
            },
            changeStep(index){
                let next = index;
                let current = this.step;
                let that = this;
                if(next == 1){
                    that.step = next;
                }else{
                    if(current == 1){
                        this.$refs['validateForm1'].validate(valid => {
                            if(valid){
                                if(that.validateForm.cerNo){
                                    if(that.validateCerNo){
                                        that.step = next;
                                    }else{
                                        that.checkCerNumber();
                                    }
                                }else{
                                    that.$notify({
                                        title: "提示",
                                        message: "请完善证件信息",
                                        type: "warning",
                                        duration: 2000
                                    });
                                }
                            }
                        })
                    }

                }

            },
            /*根据出生日期算出年龄*/
            jsGetAge(strBirthday){       
                var returnAge;
                var strBirthdayArr = strBirthday.split("-");
                var birthYear = strBirthdayArr[0];
                var birthMonth = strBirthdayArr[1];
                var birthDay = strBirthdayArr[2];
                var d = new Date();
                var nowYear = d.getFullYear();
                var nowMonth = d.getMonth() + 1;
                var nowDay = d.getDate();
                if (nowYear == birthYear) {
                    returnAge = 0;//同年 则为0岁  
                } else {
                    var ageDiff = nowYear - birthYear; //年之差  
                    if (ageDiff > 0) {
                        if (nowMonth == birthMonth) {
                            var dayDiff = nowDay - birthDay;//日之差  
                            if (dayDiff < 0) {
                                returnAge = ageDiff - 1;
                            } else {
                                returnAge = ageDiff;
                            }
                        } else {
                            var monthDiff = nowMonth - birthMonth;//月之差  
                            if (monthDiff < 0) {
                                returnAge = ageDiff - 1;
                            } else {
                                returnAge = ageDiff;
                            }
                        }
                    } else {
                        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
                    }
                }
                return returnAge;//返回周岁年龄 
            },
            //读取证件信息
            readCard(){
                var that = this;
                try{
                    //that.$http.get(Vue.prototype.URL_MDS+'/id_readcard?dev='+this.cardtype+'&json=1')
                    that.$http.get(Vue.prototype.URL_MDS+'/id_readcard?json=1')
                    .then(function (response) {
                        debugger
                        if(response.data!=""){
                            if(response.data.code != '200'){
                                //读取失败
                                that.$notify({
                                    title: "失败",
                                    message: JSON.stringify(response.data),
                                    type: "warning",
                                    duration: 2000
                                });
                            }else{
                                that.validateForm.cerType="111";
                                that.validateForm.sName = response.data.name;
                                that.validateForm.sGender = response.data.sex;
                                that.validateForm.sNation = response.data.nation;
                                that.validateForm.birthDate = response.data.birthday;
                                that.validateForm.age = that.jsGetAge(that.validateForm.birthDate);//年龄
                                that.validateForm.addr1 = response.data.address;
                                that.validateForm.cerNo = response.data.idno;
                                that.validateForm.cerAuth = response.data.authority;
                                that.validateForm.cerValid= response.data.issueday+'至'+response.data.expityday;
                                that.validateForm.headImage = response.data.head_img;
                                //人员证件验证
                                that.checkCerNumber();
                            }
                        }else{
                            //读取失败
                            that.$notify({
                                title: "失败",
                                message: "请刷身份证!",
                                type: "warning",
                                duration: 2000
                            });
                        }
                    
                    })
                }catch(e){
                    console.error(e)
                    that.$notify({
                        title: "失败",
                        message: "读取证件信息接口失败!",
                        type: "warning",
                        duration: 2000
                    });
                }

            },
            checkCerNumber(){
                let that = this;
                if(that.validateForm.cerNo){
                    let params = {
                        cerNo:that.validateForm.cerNo
                    }
                    infoApi.checkCerNo(params)
                        .then(function (res) {
                            if(res.data.success){
                                that.validateCerNo = true;
                            }else{
                                that.validateCerNo = false;
                                that.$notify({
                                    title: "人员证件验证未通过",
                                    message: res.data.msg,
                                    type: "warning",
                                    duration: 2000
                                });
                            }
                        })
                        .catch(function (res) {
                            that.$notify({
                                title: "提示",
                                message: '人员证件验证失败，请重试',
                                type: "warning",
                                duration: 2000
                            });
                        })
                }
            },
            //视频播放
            playvideo() {
                try{
                    var that = this;
                    that.$http.get(Vue.prototype.URL_MDS+'/playvideo?dev=camera&json=1')
                    .then(function (response) {
                        debugger
                        if(response.body.code == '101'){
                                                                            
                        }else{
                            that.$notify({
                                title: "失败",
                                message: "视频播放失败!"+JSON.stringify(response.body),
                                type: "warning",
                                duration: 2000
                            });
                            //that.closeplayvideo();
                        }      
                    })
                 }catch(e){
                    console.error(e)
                    that.$notify({
                        title: "失败",
                        message: "调用视频播放接口失败!",
                        type: "warning",
                        duration: 2000
                    });
                }
            },
            //人脸拍照
            registerFace() {
                try{
                    var that = this;
                    that.$http.get(Vue.prototype.URL_MDS+'/snapshot?dev=camera&json=1&getfeature=1')
                    .then(function (response) {
                        debugger
                        if(response.body.code == '104'){
                            that.validateForm.irisFace = response.data.data;
                        }else{
                            that.$notify({
                                title: "失败",
                                message: JSON.stringify(response.body),
                                type: "warning",
                                duration: 2000
                            });
                        }
                        that.closeplayvideo();
                    })    
                }catch(e){
                    console.error(e)
                    that.$notify({
                        title: "失败",
                        message: "人脸拍照接口失败!",
                        type: "warning",
                        duration: 2000
                    });
                }
            },
            //注册虹膜 //用304/305注册
            registerIris(){
                var that = this;
                this.openFullScreen();//loading
                var deviceK =  Vue.prototype.deviceK;
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
                    case "4":
                        eye = "single";
                        break;                        
                    default:
                        break;
                }
                var staffId = '1123';//that.validateForm.idcardNumber;
                var url =
                    Vue.prototype.URL_MDS +
                    "/iris_enroll_whole?id=" +
                    staffId +"&eye=" +
                    eye +
                    "&return_img=1&json=0";
                //    http://127.0.0.1:8001/iris_enroll_whole?id=1123&eye=both&return_img=1&json=1
                 try{                    
                    $.getScript(url, function () {
                        debugger
                        var json = $.parseJSON(obj.msg);
                        var template = json.data;
                        if (json.code == "6") {
                            debugger
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
                            }else if(that.eyes == "4"){
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
                            that.irisCompariServer('/iris/feature/extract',params);
                        } else {
                            loading.close();
                            that.$notify({
                                title: "失败",
                                message: "采集失败"+obj.msg,
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
             //虹膜特征比对服务
            irisCompariServer(url,params) {
                var that = this;
                var param ={
                    url:url,
                    data:JSON.stringify(params)
                };
                 infoApi.irisCompariServer(param)
                    .then(function (res) {
                        debugger
                         if (res.data.success && res.data.data.length >0) {
                             var obj = $.parseJSON(res.data.data);
                             if(obj.result == 1){
                                 that.eyes = String(obj.data.feature.eye_type);
                                 that.validateForm.templateL = obj.data.feature.left;//左眼虹膜模板数据信息
                                 that.validateForm.templateR = obj.data.feature.right;//右眼虹膜模板数据信息
                                 that.validateForm.qL = obj.data.quality.left;//左眼质量
                                 that.validateForm.qR = obj.data.quality.right;//右眼质量
                                that.$notify({
                                    title: "成功",
                                    message: "虹膜特征提取成功",
                                    type: "success",
                                    duration: 2000
                                });
                             }else{
                                that.$notify({
                                    title: "虹膜特征提取失败",
                                    message: res.data.data,
                                    type: "warning",
                                    duration: 2000
                                });
                             }
                             loading.close();
                        } else {
                            that.$notify({
                                title: "虹膜特征提取失败",
                                message: res.data.msg,
                                type: "warning",
                                duration: 2000
                            });
                            loading.close();
                        }
                        //that.deviceclose();
                    })
                .catch(function (res) {
                    console.log(res);
                   // that.deviceclose();
                });
            },
            //关闭视频播放
            closeplayvideo() {
                var that = this;
                 this.$http.get(Vue.prototype.URL_MDS+'/closevideo?dev=camera&json=1')
                    .then(function (response) {
                        debugger
                    if(response.body.code == '103'){
                        that.$notify({
                            title: "成功",
                            message: "关闭视频播放成功",
                            type: "success",
                            duration: 2000
                        });
                    }else{
                        //读取失败
                        that.$notify({
                            title: "失败",
                            message: JSON.stringify(response.body),
                            type: "warning",
                            duration: 2000
                        });
                    }
                })
               
            },
            //设备初始化
            deviceinit(type) {
                var that = this;
                this.openFullScreen();
                //this.$http.get(Vue.prototype.URL_MDS+'/initdev?dev='+Vue.prototype.deviceK+'&json=1')
                this.$http.get(Vue.prototype.URL_MDS+'/iris_initdev?json=1')
                    .then(function (response) {
                        debugger
                         if(response.body.code == '2' || response.body.code == '-15'){
                             if(type == 'registerIris'){
                                that.registerIris()
                             }else{
                                 loading.close();
                             }
                            //  if(type=='registerFace'){
                            //       that.registerFace()
                            //  }
                        }else{
                            //读取失败
                             loading.close();
                            that.$notify({
                                title: "失败",
                                message: JSON.stringify(response.body),
                                type: "warning",
                                duration: 2000
                            });
                        }
                })
            },
            //关闭设备
            deviceclose() {
                var that = this;
                $.getScript(Vue.prototype.URL_MDS+'/closedev?dev='+Vue.prototype.deviceK, function () {
                    debugger
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
                            message: obj.msg,
                            type: "warning",
                            duration: 2000
                        });
                    }
                })
            },
            //重新输入证件号码
            reset(){
                this.cerInfoVisible = false;
                this.$nextTick(function () {
                    this.$refs['validateForm_cer'].resetFields();
                })
            },
            search(){
                this.$notify({
                    title: "提示",
                    message: "此功能尚未开通!",
                    type: "warning",
                    duration: 2000
                });

            },
            searchByNum(form){
                let that = this;
                that.$refs[form].validate(valid => {
                    if(valid){
                    }
                })
            },
            //提交表单
            submit(){
                let that = this;
                let validateFeatur = false;
                if(that.validateForm.irisType == 1 && that.validateForm.irisL){
                    validateFeatur = true;
                }else if(that.validateForm.irisType == 2 && that.validateForm.irisR){
                    validateFeatur = true;
                }else if(that.validateForm.irisType == 3 && that.validateForm.irisL && that.validateForm.irisR){
                    validateFeatur = true;
                }

                if( that.validateForm.irisFace && validateFeatur){
                    if(that.validateForm.irisType == 1 && !that.validateForm.templateL){
                        that.$notify({
                            title: "提示",
                            message: '请完善左眼虹膜模板数据',
                            type: "warning",
                            duration: 2000
                        });
                        return false;
                    }
                    if(that.validateForm.irisType == 2 && !that.validateForm.templateR){
                        that.$notify({
                            title: "提示",
                            message: '请完善右眼虹膜模板数据',
                            type: "warning",
                            duration: 2000
                        });
                        return false;
                    }
                    if(that.validateForm.irisType == 3 && (!that.validateForm.templateL || !that.validateForm.templateR)){
                        that.$notify({
                            title: "提示",
                            message: '请完善虹膜模板数据',
                            type: "warning",
                            duration: 2000
                        });
                        return false;
                    }

                    if(this.isQuering){
                        return false;
                    }
                    that.isQuering = true;
                    var params = that.validateForm;
                    if(params.sNation.indexOf('族') == -1){
                        params.sNation += '族';
                    }
                    console.log('>>>>>>>>>>>>>>that.nationOptions',that.nationOptions)
                    for(let i = 0; i < that.nationOptions.length; i++){
                        if(params.sNation == that.nationOptions[i].name){
                            params.sNation = that.nationOptions[i].value;
                            break;
                        }
                    }
                    switch (params.sGender) {
                        case '男':
                            params.sGender = 1;
                            break;
                        case '女':
                            params.sGender = 2;
                            break;
                        default: break;
                    }
                    console.log('>>>>>>>before infoApi.save params:',params)
                    infoApi.save(params)
                        .then(function (res) {
                            console.log(res)
                            if(res.data.data){
                                that.repeatID = res.data.data;
                            }
                            if(res.data.success){
                                that.dialogVisible_success = true;
                            }else{
                                that.$notify({
                                    title: "保存失败",
                                    message: res.data.msg,
                                    type: "warning",
                                    duration: 2000
                                });
                                //重复
                                if(res.data.code == 602){
                                    infoApi.detail({id: res.data.data})
                                        .then(function (res) {
                                            if (res.data.success && res.data.data) {
                                                that.dialogVisible_deatil = true;
                                                that.validateForm_detail = res.data.data;
                                            }
                                        })
                                        .catch(function (res) {
                                        });
                                }
                            }
                            that.isQuering = false;
                        })
                        .catch(function (res) {
                            console.log(res);
                            that.isQuering = false;
                            that.$notify({
                                title: "失败",
                                message: '保存失败',
                                type: "warning",
                                duration: 2000
                            });
                        });
                }else{
                    that.$notify({
                        title: "提示",
                        message: '请完善生物特征',
                        type: "warning",
                        duration: 2000
                    });
                }
            },
            //重复采集确定、保存成功确定，跳详情
            toDetail(){
                console.log(this.repeatID)
                let that = this;
                this.$router.push({name: "infoDetail", params: {id: that.repeatID}});
            },
            //继续添加
            continueAdd(){
                let that = this;
                this.dialogVisible_success = false;
                this.step = 1;
                this.$nextTick(function () {
                    that.$refs['validateForm1'].resetFields();
                    that.validateForm.validateCerNo = false;
                    that.validateForm.headImage = '';
                    that.validateForm.irisFace = '';
                    that.validateForm.templateL = '';
                    that.validateForm.templateR = '';
                    that.validateForm.irisL = '';
                    that.validateForm.irisR = '';
                    that.validateForm.irisType = '';
                    that.validateForm.qL = '';
                    that.validateForm.qR = '';
                })
            },
            back(){
                this.$router.back(-1);
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
        }
    }
</script>

<style scoped lang="less">
    @import "../../style/form.less";
    .stepBox{
        margin-left:3%;
        margin-bottom: 20px;
        line-height: 40px;
        height: 40px;
    }
    .stepItem{
        width: 32%;
        float:left;
        font-size: 16px;
        color: #7e7c7dfa;
        text-align: center;
        line-height: 40px;
        height: 40px;
    }
    .clearfix {
        zoom: 1;
    }
    .clearfix:after {
        content: ".";
        display: block;
        clear: both;
        visibility: hidden;
        font-size: 0;
        height: 0;
        line-height: 0;
    }
    .stepItem{
        background: #EEEEEE;
        box-sizing: border-box;
        position: relative;
    }
    /* 为步骤数字添加样式 */
    .stepItem i{
        width: 30px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        border-radius: 50%;
        background-color: #fff;
        transform: scale(0.8,0.8);
        -ms-transform:scale(7deg);
    -moz-transform:scale(7deg);
    -webkit-transform:scale(7deg);
        -o-transform:scale(7deg);
    font-weight: bold;
        color: #7E7C7D;
    }
    /* 为每个步骤末尾加灰色三角形和白色边框 */
    .stepItem::after{
        content: "";
        border: 3px solid #fff;
        border-bottom: none;
        border-left: none;
        background-color: #EEEEEE;
        height: 28px;
        width: 27px;
        position: absolute;
        display: block;
        top: 5px;
        right: -15px;
        z-index: 10;
        transform:rotate(45deg);
        -ms-transform:rotate(45deg);
    -moz-transform:rotate(45deg);
    -webkit-transform:rotate(45deg);
        -o-transform:rotate(45deg);
    }
    /* 当前步骤加绿色三角形和白色边框 */
    .stepBox .active:after ,.stepBox .done:after{
        /*background-color: #0084CC;*/
        content: "";
        border: 3px solid #fff;
        border-bottom: none;
        border-left: none;
        height: 28px;
        width: 27px;
        position: absolute;
        display: block;
        top: 4.5px;
        right: -15px;
        z-index: 10;
        transform:rotate(45deg);
        -ms-transform:rotate(45deg);
    -moz-transform:rotate(45deg);
    -webkit-transform:rotate(45deg);
        -o-transform:rotate(45deg);
    }
    /* 当前步骤中的样式修改 */
    .stepBox .done,.stepBox .done:after{
        background: #44ADE6;
    }
    .stepBox .active,.stepBox .active:after{
        background-color: #0084CC;
    }
    .stepBox .active span,.stepBox .done span{
        color: #fff;
    }
    .stepBox .active i,.stepBox .done i{
        color: #0084CC;
    }
    /* 取消最后一项所有的after伪类 */
    .stepItem:last-child::after{
        content: "";
        border: none;
        height: 0;
        width: 0;
        z-index: 11;
    }
    .tab-container{
        margin: auto;
        display: inline-block;
        .tab{
            display: inline-block;
            height: 35px;
            line-height: 35px;
            width: 120px;
            background: #CCE6F5;
            color: #0084CC;
            float: left;
            box-sizing: border-box;
            cursor: pointer;
        }
        .tab.active{
            color: #fff;
            background:#0084CC;
            border:1px solid #0084CC ;
        }
        .tab:first-child{
            border-top-left-radius:4px;
            border-bottom-left-radius:4px;
        }
        .tab:last-child{
            border-top-right-radius:4px;
            border-bottom-right-radius:4px;
        }
    }

    .dialog-form{
        width: 92%;
    }
    .detail-dialog .form-group{
        padding-left: 2%;
        padding-right: 2%;
        line-height: 2;
    }
    .detail-dialog .btns-container{
        margin: 20px 0 10px;
    }
    .feature-container>div{
        text-align: center;
    }
    .feature-wrap:last-child{
        margin-right: 0;
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
    .eyes{
        width: 100px;
        margin-right: 15px;
    }
    .avatar{
        width: 109px;
        height: 134px;
    }
    .dialog-content{
        text-align: left;
        font-size: 18px;
        position: relative;
        left: 3%;
    }
    .form-group-footer{
        position: relative;
        left: -5%;
    }
    .el-radio{
        margin-right: 15px
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

</style>
