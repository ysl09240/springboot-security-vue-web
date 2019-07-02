import baseServer from '@/api/baseServer'

const orgApi={
    // 列表
    list : function(data){
        return baseServer.commonGet('/dept/list', data);
    },
    // 树
    tree : function(data){
        return baseServer.commonGet('/dept/tree',data);
    },
    detail : function(data){
        return baseServer.commonGet('/dept/detail',data);
    },
    add:(data) => {
        return baseServer.commonPost('/dept/save',data);
    },
    update:(data) => {
        return baseServer.commonPost('/dept/update',data);
    },
    checkUnique:(data) => {
        return baseServer.commonGet('/dept/validate',data);
    },
    delete:(data) => {
        return baseServer.commonPost('/dept/delete',data);
    },
    getSortList:(data) => {
        return baseServer.commonGet('/dept/sortList',data);
    },
    currentUserTree:() => {
        return baseServer.commonGet('/dept/user/tree', {});
    }
};

export default orgApi
