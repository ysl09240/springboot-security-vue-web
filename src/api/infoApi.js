import baseServer from '@/api/baseServer'

const infoApi={
    list : function(data){
        return baseServer.commonPost('/collect/list', data);
    },
    detail : function(data){
        return baseServer.commonGet('/collect/detail', data);
    },
    checkCerNo : function(data){
        return baseServer.commonGet('/collect/checkByCerNo', data);
    },
    save : function(data){
        return baseServer.commonPost('/collect/save', data);
    },
    update : function(data){
        return baseServer.commonPost('/collect/update', data);
    },
	//虹膜特征比对服务:虹膜特征提取
    irisCompariServer : function(data){
        return baseServer.commonPost('/collect/irisCompariServer', data);
    }
};

export default infoApi
