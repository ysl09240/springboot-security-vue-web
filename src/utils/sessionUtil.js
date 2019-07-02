//session存储
var sessionUtil = {};
const exp = 6*60*60*1000; //过期时间为无操作时半小时

sessionUtil.setItem=function(key,value){
    sessionUtil.curTime = new Date().getTime();
    sessionStorage.setItem(key,JSON.stringify({data:value,time:sessionUtil.curTime}));
}

sessionUtil.getItem=function(key){
    sessionUtil.dataObj = JSON.parse(sessionStorage.getItem(key));  //(new Function("", "return " + sessionStorage.getItem(key)))();
    let result = '';
    if(sessionUtil.dataObj){
        if (new Date().getTime() - sessionUtil.dataObj.time>exp) {
            console.log('用户登录已过期');
        }else{
            result = sessionUtil.dataObj.data;
        }
    }
    return result;
}

sessionUtil.removeItem=function(key){
    sessionStorage.removeItem(key);
}

sessionUtil.clear=function(){
    sessionStorage.clear();
}
//获取当前用户
sessionUtil.getCurUser = function(){
    return sessionUtil.getItem("user");
}
//获取菜单
sessionUtil.getMenu = function(){
    return sessionUtil.getItem("menus");
};












sessionUtil.result = null;

sessionUtil.ssoTemp = 'ssoTemp';
sessionUtil.userInfo = 'userInfo';
sessionUtil.subsystemId = 'subsystemId';
sessionUtil.projectId = 'projectId';
sessionUtil.isProjectLevel = "isProjectLevel";
sessionUtil.dataObj = null;
sessionUtil.curTime = null;




var is_temp=null;
var userT =null;
sessionUtil.getSelectIsProjectLevel=function(){
    is_temp = sessionUtil.getItem(sessionUtil.isProjectLevel);
    if(is_temp && is_temp == '1'){
        return true;
    }
    userT = sessionUtil.getItem("userInfo");
    if(userT.user.roleType == '2' ){
        return true;
    }
    return false;
}

//是否是公司级
sessionUtil.getCurUserIsCompanyLevel=function(){
    userT = sessionUtil.getItem("userInfo");
    if(userT.user.roleType == '0'|| userT.user.roleType == '1' ){
        return true;
    }
    return false;
}

//是否是住建局
sessionUtil.IsControlDeptLevel=function(){
    userT = sessionUtil.getItem("userInfo");
    if(userT.user.roleType == '3' ){
        return true;
    }
    return false;
}

//是否是项目级
sessionUtil.getCurUserIsProjectLevel=function(){
    userT = sessionUtil.getItem("userInfo");
    if(userT.user.roleType == '2' ){
        return true;
    }
    return false;
}
var routerUrl = "";
sessionUtil.getCurIndexPageBySubSystem=function(subsystemId){
    routerUrl="";
    if(sessionUtil.getSelectIsProjectLevel()){
        if(subsystemId == '5'){
            routerUrl= "/smzHomePageProject";
        }else if(subsystemId == '7'){
            routerUrl= "/environmentHomePageProject";
        }else if(subsystemId == '4'){
            routerUrl= "/monitorHomePage";
        }else if(subsystemId == '8'){
            routerUrl= "/craneManageHomePagaProject";
        }
    }else{
        if(subsystemId == '5'){
            routerUrl= "/smzHomePage";
        }else if(subsystemId == '7'){
            routerUrl= "/environmentHomePage";
        }else if(subsystemId == '4'){
            routerUrl= "/monitorHomePage";
        }else if(subsystemId == '8'){
            routerUrl= "/craneManageHomePaga";
        }
    }
    if(sessionUtil.getCurUserIsCompanyLevel()&&subsystemId!=5){
        if(subsystemId == '7'){
            routerUrl= "/environmentHomePage";
        }else if(subsystemId == '4'){
            routerUrl= "/monitorHomePage";
        }
    }
    return routerUrl;
}

sessionUtil.setCurVideoType=function(type){
    sessionUtil.setItem("videoType",type);
}
sessionUtil.getCurVideoType=function(type){
    var videoType = sessionUtil.getItem("videoType");
    if(videoType&& videoType!=null && (videoType==1 || videoType== 2)){
        return videoType;
    }
    return config.options.ptid == '1' ? 1 : 2;//默认 1-同为， 2-海康
}

export default sessionUtil
