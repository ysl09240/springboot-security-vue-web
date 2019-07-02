
import baseServer from '@/api/baseServer'

const dictDataApi={
     //字典列表
      list : function(data){
        return baseServer.commonPost('/dictData/list', data);
      },
      add :function(data){ 
        return baseServer.commonPost('/dictData/save', data);
      },
      update :function(data){
        return baseServer.commonPost('/dictData/update', data);
      },
      delete:function(data){
        return baseServer.commonGet('/dictData/del',data);
      },
     find:function(data){
        return baseServer.commonGet('/dictData/find',data);
     },
      queryByModel:function(data){
        return baseServer.commonPost('/dictData/queryByModel',data);
      },
      //查询多个数据字典 type 多个逗号分隔queryByTypes
      queryByTypes:function(data){ 
        return baseServer.commonGet('/dictData/queryByTypes',data);
      },
      queryNationList:function(data){
        return baseServer.commonPost('/dictData/queryList',data);
      },
    findOrderNumSelects :function(data){
        return baseServer.commonPost('/dictData/findOrderNumSelects', data);
    },

};

export default dictDataApi;
