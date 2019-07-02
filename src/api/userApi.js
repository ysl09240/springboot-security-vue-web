import baseServer from '@/api/baseServer'

const userApi={
    list : function(data){
        return baseServer.commonPost('/user/list', data);
    },
    delete : function(data){
        return baseServer.commonGet('/user/del', data);
    },
    deleteBatch : function(data){
        return baseServer.commonGet('/user/del/batch', data);
    },
    detail : function(data){
        return baseServer.commonGet('/user/detail', data);
    },
    save : function(data){
        return baseServer.commonPost('/user/save', data);
    },
    update : function(data){
        return baseServer.commonPost('/user/update', data);
    },
    checkUserName : function(data){
        return baseServer.commonGet('/user/validate/username', data);
    },
    checkCerNo : function(data){
        return baseServer.commonGet('/user/validate/cerNo', data);
    },
    checkOldPwd: function (data) {
        return baseServer.commonPost('/user/validate/pwd', data);
    },
    updatePwd: function (data) {
        return baseServer.commonPost('/user/pwd/update', data);
    },
    resetPwd: function (data) {
        return baseServer.commonGet('/user/pwd/reset', data);
    },
    updateState: function (data) {
        return baseServer.commonPost('/user/update/state', data);
    }
};

export default userApi
