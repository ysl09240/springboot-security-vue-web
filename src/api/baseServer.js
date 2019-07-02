import server from '@/api/server'
import Vue from 'vue'


const baseServer = server.createServer(Vue.prototype.BASE_SERVER_API);

server.addInterceptors(baseServer);

baseServer.commonPost = function (url, data) {
  return server.commonPost(baseServer,url, data);
}
baseServer.commonGet = function (url, data) {
  return server.commonGet(baseServer,url, data);
}

export default baseServer
