<template>
    <div :class="classObj">
        <div class="main">
            <!-- top start-->
            <div class="header-container">
                <div class="header-left" @click="enteranceEnter" @keyup.enter.native="enteranceEnter">
                    <img  :src="title" style="cursor: pointer">
                    <span>{{configDate}}</span>
                </div>
                <div class="header-right">
                    <navbar></navbar>
                </div>
            </div>
            <!-- top end-->
            <!-- 左侧滑动   start -->
            <div class="sidebar-container">
                <div class="horizontal-collapse-transition">
                    <div class="hamburger-container" >
                        <img  :src="Toggle"  @click="toggleClick" class="hamburger" />
                    </div>
                    <el-scrollbar class="el-menu-vertical-demo">
                        <el-menu :default-active="$route.meta.title" :unique-opened=true :collapse-transition=true :router=false  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                            <div class="index ">
                                <router-link :to="routerUrl">
                                    <el-menu-item index="首页">
                                        <i class="el-icon-home"></i>
                                        <span slot="title">首页</span>
                                    </el-menu-item>
                                 </router-link>
                            </div>
                            <Navmenu :navMenus="leftMenus"></Navmenu>
                        </el-menu>
                    </el-scrollbar>
                </div>
            </div>
            <!-- 左侧滑动   end -->
            <div class="main-container">
                <breadcrumb class="breadcrumb-container" :navMenus="leftMenus"></breadcrumb>
                <router-view />
            </div>
        </div>
    </div>
</template>
<script >
    import Navbar from "@/components/Navbar";
    import Navmenu from "@/components/Navmenu";
    import breadcrumb from "@/components/breadcrumb";
    import title from "@/assets/img/logo.png";
    import Toggle from "@/assets/icon/toggle.png";
    import sessionUtil from '@/utils/sessionUtil';
    import event from "@/utils/event.js";
    var helpMenu = [
        {
            code: "business",
            url: "/business",
            icon: "el-icon-business",
            id: "0",
            label: "业务流程",
            name: "业务流程",
        },
        {
            code: "question",
            url: "/question",
            icon: "el-icon-help",
            id: "1",
            label: "常见问题",
            name: "常见问题",
        },
        {
            code: "downloadCenter",
            url: "/downloadCenter",
            icon: "el-icon-download",
            id: "2",
            label: "下载中心",
            name: "下载中心",
        }
    ]
    export default {
        data() {
            return {
                isCollapse: false,
                searchCriteria: "",
                library_id: "",
                leftMenus: [],
                title,
                Toggle,
                configDate: '',
                isHaveReturnCompanyLevel:false,
                isHaveIndexPage:false,
                routerUrl:"",
                userT:null,
            };
        },
        components: {
            Navbar,
            Navmenu,
            breadcrumb,
        },
        computed: {
            classObj() {
                return {
                    hideSidebar: this.isCollapse
                };
            }
        },
        mounted(){
            this.receive();

        },
        created() {
            let menu = sessionUtil.getMenu();
            this.leftMenus = menu ? menu : [];
            this.configure();
            this.reloadIndexPage();
        },
        methods: {
            configure(){
                this.configDate=config.titles.layout;
            },
             receive(){
                event.$on('reloadVideoTreeMessage',(data)=>{
                    console.log(data);
                    this.getVideoMenu();
                })
                event.$on('reloadTreeMessage', (data) => {
                    this.reloadMenu();
                    this.reloadReturnCompanyLevel();
                    this.reloadIndexPage();
                })

            },

            reloadIndexPage(){
                var subsystemId =sessionUtil.getItem(sessionUtil.subsystemId);
                if(subsystemId && (subsystemId == '4' || subsystemId == '5' || subsystemId == '7' || subsystemId == '8')){                  
                    this.isHaveIndexPage = true;
                    this.routerUrl =  sessionUtil.getCurIndexPageBySubSystem(subsystemId);
                }else{
                    this.isHaveIndexPage = false;
                }
            },
            reloadReturnCompanyLevel(){
                var subsystemId =sessionUtil.getItem(sessionUtil.subsystemId);
               
                if(sessionUtil.getCurUserIsCompanyLevel() && subsystemId != 5){
                    this.isHaveReturnCompanyLevel =false;
                }else{

                    if(sessionUtil.getCurUserIsProjectLevel()){
                        this.isHaveReturnCompanyLevel =false;
                    }else{
                        this.isHaveReturnCompanyLevel = sessionUtil.getSelectIsProjectLevel();
                    }

                }
               
            },
            returnCompanyLevel(){
            },

            configure() {
                this.configDate = config.titles.layout;
            },
            toggleClick() {
                this.isCollapse = !this.isCollapse;
                event.$emit("isCollapse",this.isCollapse);
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            enteranceEnter(){
                this.userT = sessionUtil.getItem("userInfo");
                if(this.userT.user.roleType == '0'|| this.userT.user.roleType == '1'|| this.userT.user.roleType == '3' ){
                    this.$router.push({ path: "/entrance" });
                }
                if(this.userT.user.roleType == '2' ){
                    this.$router.push({ path: "/subEntrance" });
                }
            }
        },
    };
</script>
<style scoped>
    a {
        text-decoration: none;
    }

    .router-link-active {
        text-decoration: none;
    }
</style>
