import baseServer from '@/api/baseServer'
import sessionUtil from '@/utils/sessionUtil'

const loginApi={
    // 登录接口
    login : function(data){       
        return baseServer.commonPost('/login', data);
    },
    // 退出接口
    logout : function(){
        sessionUtil.clear();
        return baseServer.commonPost('/user/logout.json',null);
    },

    tokenRefresh : function(){
        return baseServer.commonGet('/token/refresh',null);
    },


};

export default loginApi
