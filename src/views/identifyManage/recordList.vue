<template>
    <div class="app-container calendar-list-container">
        <div class="tableBg">
            <!-- 筛选条件 begin -->
            <div class="filter-container">
                <el-input v-model="listQuery.name" class="filter-item" placeholder="请输入人员姓名"></el-input>
                <el-select class="filter-item" placeholder="请选择民族" v-model="listQuery.nation" filterable>
                    <el-option
                            v-for="(item,index) in nationOptions"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                    >{{item.name}}</el-option>
                </el-select>
                <el-select class="filter-item" placeholder="请选择证件类型" v-model="listQuery.cerType" filterable>
                    <el-option
                            v-for="(item,index) in certificatesOptions"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                    >{{item.name}}</el-option>
                </el-select>
                <el-input class="filter-item" placeholder="请输入证件编号" v-model="listQuery.cerNo"></el-input>
                <el-select class="filter-item"
                    placeholder="请选择户籍地址/省"
                    v-model="listQuery.provinceId"
                    @change="changeProvince"
                >
                    <el-option
                        v-for="item in provinces"
                        :key="item.cityId"
                        :label="item.city"
                        :value="item.cityId"
                       
                    >{{item.city}}
                    </el-option>
                </el-select>
                 <el-select  class="filter-item"
                    placeholder="请选择户籍地址/市"
                    v-model="listQuery.cityId"
                    @change="changeCity"
                >
                    <el-option
                        v-for="item in citys "
                        :key="item.cityId"
                        :label="item.city"
                        :value="item.cityId"
                    >{{item.city}}
                    </el-option>
                </el-select>
                <el-select  class="filter-item"
                    placeholder="请选择户籍地址/区"
                    v-model="listQuery.countyId"
                    @change="changeCounty"
                >
                    <el-option
                        v-for="item in countys"
                        :key="item.cityId"
                        :label="item.city"
                        :value="item.cityId"
                    >{{item.city}}
                    </el-option>
                </el-select>
                 <Treeselect  class="filter-item"
                             filterable
                             v-model="listQuery.opAddr"
                             :options="organizationOptions"
                             :load-options="loadOptions"
                             :multiple="false"
                             placeholder="请选择识别点位"
                             noResultsText="未找到结果..."
                             noOptionsText="未找到结果..."
                             @select="handleTreeSelected"/>       
                 <el-date-picker class="filter-item"
                                placeholder="请选择开始时间"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @change="checkDate"
                                v-model="listQuery.startTime">
                </el-date-picker>

                <el-date-picker class="filter-item"
                                placeholder="请选择结束时间"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @change="checkDate"
                                v-model="listQuery.endTime">
                </el-date-picker>

                <!-- buttons -->
                <el-button class="query-green-icon" type="primary" icon="el-icon-searchZdy" round @click="search" >查询</el-button>
                <el-button class="query-blue-icon" type="primary" icon="el-icon-resetZdy" round @click="reset">重置</el-button>
            </div>
            <!-- 筛选条件 end -->

            <!-- table -->
            <el-table ref="multipleTable"
                      :data="tableData"
                      v-loading="listLoading"
                      @selection-change="handleSelectionChange"
                      empty-text=" "
                      border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column align="center" label="序号" width="55" type="index" :index="indexMethod"></el-table-column>
                <el-table-column prop="name" label="人员姓名" ></el-table-column>
                <el-table-column prop="nation" label="民族" ></el-table-column>
                <el-table-column prop="cerType" label="证件类型" ></el-table-column>
                <el-table-column prop="cerNo" label="证件编号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="residenceAddr" label="户籍地址"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="opTime" label="识别时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="opAddr" label="识别点位"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="opWorker" label="操作人" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="personnelType" label="人员类型"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="alarmReason" label="报警原因" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="详情" placement="top">
                            <span class="table-detail" @click.stop="detail(scope.row)"></span>
                      </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!--无数据-->
            <img :src="nonews" alt="" v-show="ishowNodataPic" class="nonews">
        </div>

        <!-- 分页器 -->
        <div class="app-behind">
            <el-pagination background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :page-sizes="[5, 10, 20, 30,50,100]"
                           :page-size="listQuery.pageSize"
                           :current-page="listQuery.pageIndex"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
    </div>
  </div>
</template>

<script>
import irisRecordApi from "@/api/irisRecordApi";
import nonews from "@/assets/nonews.png";
import dictDataApi from "@/api/dictDataApi";
import cityApi from "@/api/cityApi";
import orgApi from "@/api/orgApi";
import Treeselect from "@riophae/vue-treeselect";
export default {
    components:{Treeselect},
    data() {
        return {
            //选项
            roleOptions:[],
            stateOptions:[
                {
                    name:'请选择',
                    value: ''
                },
                {
                    name:'在用',
                    value: '1'
                },
                {
                    name:'停用',
                    value: '0'
                },
            ],
            certificatesOptions:[],
            nationOptions:[],
            provinces:[],
            citys:[],
            countys:[],
            organizationOptions:[],
            
            //筛选条件
            listQuery: {
                pageIndex: 1,
                pageSize: 10,
                name:'',            //姓名
                nation:'',          //民族
                cerType:'',         //证件类型
                cerNo:'',           //证件编号
                provinceId:'',      //省id
                cityId:'',          //市id
                countyId:'',        //区id
                residenceAddr:'',   //户籍地址
                opAddr:null,          //识别点位
                startTime:'',       //开始时间
                endTime:'',         //结束时间
            },

            //table
            tableData: [],
            listLoading: true,      //true-加载中；false-加载完成
            multipleSelection: [],  //选中数据集合

            nonews,
            ishowNodataPic:false, // 没有数据是显示的图片
            total: null,


        };
    },
    created() {
        this.getCerType();
        this.getNation();
        this.getFirstCityList();
        this.getDeptTree();
        this.getList();
    },
    methods: {

        //查询组织
        getDeptTree(){
            let that = this
            orgApi.tree().then(function (res) {
                that.organizationOptions = []
                that.organizationOptions.push(res.data.data)
            }).catch(function(res) {
                console.log('getDeptTree fail res :',res);
            });
        },
       
        //  查询所有选项
        getNationOpts() {
            var that = this;
            that.projects = [];
            that.projects.push({id:"",projectName:"请选择项目"});
        },

        //  点击查询按钮
        search() {
            this.listQuery.pageIndex = 1;
            this.listQuery.residenceAddr = this.province+this.cityId+this.countyId;
            this.getList();
        },
         loadOptions({action, parentNode, callback}) {
            callback()
        },
         //选中识别点位
        handleTreeSelected(node){
            this.listQuery.opAddr = node.id;
        },

        //  重置筛选条件
        reset() {
            this.listQuery.name = "";
            this.listQuery.nation = "";
            this.listQuery.cerType = "";
            this.listQuery.cerNo="";
            this.listQuery.residenceAddr = "";
            this.listQuery.opAddr = null;
            this.listQuery.startTime = "";
            this.listQuery.endTime="";
            this.listQuery.provinceId="";
            this.listQuery.cityId="";
            this.listQuery.countyId="";
        },
         //获取所有民族
        getNation(){
            let that=this;
            dictDataApi.queryByTypes({type:"NATION_TYPE"}).then(function(res){
                if(res.data.data.NATION_TYPE!=null){
                     that.nationOptions = res.data.data.NATION_TYPE;
                }
            })
            .catch(function(res){
                console.log('get nation fail res :',res);
            })
        },
        //获取所有证件类型
        getCerType(){
            let that=this;
            dictDataApi.queryByTypes({type:"CERTIFICATES_TYPE"}).then(function(res){
                if(res.data.data.CERTIFICATES_TYPE!=null){
                     that.certificatesOptions = res.data.data.CERTIFICATES_TYPE;
                }
            })
            .catch(function(res){
                console.log('getCerType fail res :',res);
            })
        },
        //  请求table数据
        getList() {
            let that = this;
            this.listLoading = true;
            const param = this.listQuery;
            irisRecordApi.list(param)
                .then(function(res) {
                    let data = res.data.data
                    that.tableData = data.list || [];
                    that.total = data.total || 0;
                    that.listLoading = false;
                    that.ishowNodataPic = that.total > 0? false : true;
                })
                .catch(function(res) {
                    console.log('getList fail res :',res);
                    that.listLoading = false;
                    that.ishowNodataPic = that.total > 0? false : true;
                });
        },

        //查看详情
        detail(row){
            this.$router.push({name: "recordDetail", params: {id: row.id}});
        },
        //  table 选择项改变
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //当前页currentPage改变
        handleCurrentChange(val) {
            this.listQuery.pageIndex = val;
            this.getList();
        },

        //每页显示个数pageSize改变
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.getList();
        },

        //自定义序号
        indexMethod(index) {
            return (
                index + (this.listQuery.pageIndex - 1) * this.listQuery.pageSize + 1
            );
        },

        //地址变更
        changeProvince(provinceId) {
            var that = this;
            that.getChildCityList(2, provinceId);
        },
        changeCity(cityId) {
            var that = this;
            that.getChildCityList(3, cityId);
        },
        changeCounty(countyId) {
            var county = this.queryLabel(this.countys, countyId);
            if (county != null) {
                var city = this.queryLabel(this.citys, county.parentId);
                if (city != null) {
                    var province = this.queryLabel(this.provinces, city.parentId);
                    if (province != null) {
                        var address = province.city + city.city + county.city;
                        this.queryJWD(address);
                    }
                }
            }
        },
        //查询省市区级联
        getFirstCityList() {
            var that = this;
            var param = {
                level: 1
            };
            cityApi.queryCityByLevel(param).then(function (res) {
                that.provinces = res.data.data;
            });
        },
        getChildCityList(level, cityId) {
            var that = this;
            var param = {
                parentCityId: cityId
            };
            cityApi.queryChildCityById(param).then(function (res) {
                if (level == 2) {
                    that.citys = res.data.data;
                } else if (level == 3) {
                    that.countys = res.data.data;
                }
            });
        },
        checkDate(){
            if(this.listQuery.startTime && this.listQuery.endTime && (this.listQuery.startTime > this.listQuery.endTime)){
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                this.listQuery.startTime = "";
                this.listQuery.endTime="";
            }
        },
  }
};
</script>

<style scoped lang="less">
.boederSd {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 26px 0;
  padding: 20px 0;
}


</style>
