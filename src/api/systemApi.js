import baseServer from '@/api/baseServer'

const userApi={
    add : function(data){
        return baseServer.commonPost('/add', data);
    }
};

export default userApi
