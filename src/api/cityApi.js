import baseServer from '@/api/baseServer'

const cityApi={
    queryCityByLevel:function(data){
        return baseServer.commonGet('/city/level',data);
      },
    queryChildCityById:function(data){
        return baseServer.commonGet('/city/parentCityId',data);
    }
}
export default cityApi;