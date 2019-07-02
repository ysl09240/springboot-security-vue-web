import baseServer from '@/api/baseServer'

const irisRecordApi={
    list : function(data){
        return baseServer.commonPost('/distinguish/list', data);
    },
    detail : function(data){
        return baseServer.commonGet('/distinguish/detail',data);
    },
    distinguish:function(data){
        return baseServer.commonGet('/distinguish/distinguish',data);
    },
    getBusIrisRecordsList:function(data){
        return baseServer.commonGet('/distinguish/getBusIrisRecordsList',data);
    },
    recordInfoList:function(data){
        return baseServer.commonGet('/distinguish/recordInfoList',data);
    },
    irisCompariServer:function(data){
        return baseServer.commonGet('/distinguish/irisCompariServer',data);
    }


};

export default irisRecordApi
