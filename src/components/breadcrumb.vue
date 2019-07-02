<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in levelList" :v-if="item.meta.title" :key="item.path">
            <el-breadcrumb-item>
                <span v-if="index == 0" class="breadcrumb-item">
                  <img :src="location" style="vertical-align:middle;margin-right: 4px;color: #50646f;"/>
                  <span>当前位置：</span>
                  <span @click="routeclick(item)" style="font-weight: bold" class="titlehover">{{item.meta.title}}</span>
                </span>
                <router-link  v-else :to="item.meta.haschildren?item.path:''" class="titlehover">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
    import location from "@/assets/icon/location.png";
    import sessionUtil from '@/utils/sessionUtil'
    export default {
        name: 'breadCrumb',
        props: ['navMenus'],
        data() {
            return {
                breadlist:'',
                systemName:'',
                url:'',
                name:'',
                urlChildren:'',
                nameChildren:'',
                location,
                levelList:[]
            }
        },
        created() {
            this.getBreadcrumb()
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        methods: {
            getBreadcrumb() {
                var matched = this.$route.matched.filter( item =>{
                    if(item.meta.title){
                        return true
                    }
                });
                this.levelList = matched;
            },
            routeclick(item){
                console.log()
                var url = item.path;
                this.$router.push({ path: url});
            }
        }
    }
</script>
<style scoped lang="less">
    .breadcrumb-item {
        position: relative;
        padding-left: 25px;
        img {
            position: absolute;
            top: -3px;
            left: 0;
            width: 18px;
            height: 18px;
        }
    }
    .titlehover {
        cursor: pointer !important;
        &:hover {
            color: #3ac0c3 !important;
        }
    }
</style>


