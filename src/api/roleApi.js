import baseServer from '@/api/baseServer'

const roleApi={
    list : function(data){
        return baseServer.commonPost('/role/list', data);
    },
    save : function(data){
        return baseServer.commonPost('/role/save', data);
    },
    update : function(data){
        return baseServer.commonPost('/role/update', data);
    },
    delete : function(data){

        return baseServer.commonGet('/role/delete', data);
    },
    checkunique : function(data){
        return baseServer.commonGet('/role/checkunique', data);
    },
    findById : function(data){
        return baseServer.commonGet('/role/findById', data);
    },
    getMenuTree : function(data){
        return baseServer.commonPost('/role/getMenuTree', data);
    },

    findUserRoleById : function(data){
        return baseServer.commonGet('/role/findUserRoleById', data);
    },

    allList: function () {
        return baseServer.commonGet('/role/all', {});
    }

};

export default roleApi
