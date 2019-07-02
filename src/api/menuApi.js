import baseServer from '@/api/baseServer'

const menuApi={
    findTreeByRoleId : function(param){
        return baseServer.commonGet('/menu/role/id', param);
    }
};

export default menuApi
