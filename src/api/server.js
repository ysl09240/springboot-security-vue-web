import router from '@/router';
import axios from 'axios';
import sessionUtil from '@/utils/sessionUtil'
import loginApi from '@/api/loginApi'
import {
    Message,
    Alert,
    Loading
} from 'element-ui';
import Vue from 'vue';

const critical = 15*60*1000;   //token失效前15分钟更新token

Vue.prototype.$message = Message;

var coreServer = function () {
};

coreServer.createServer = function (url) {
    var server = axios.create({
        baseURL: url, // api的base_url
        timeout: 180*1000, // request timeout
        headers: {
        }
    });
    return server;
};

coreServer.commonPost = function (server, url, data) {
    const d = transformRequest(data, url,'post');

    return server.post(url,
        d, {
            headers: {

            }
        }
    );
}

coreServer.commonGet = function (server, url, data) {
    const d = transformRequest(data, url,'get');
    return server.get(url + "?" + d, {
        headers: {
        }
    });
}

const transformRequest = function (data, url,method) {
    let ret = ''
    if(url.indexOf('/login') > -1 || method == 'get'){
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent((data[it] == null || data[it] == undefined) ? "" : data[it]) + '&'
        }
        return ret
    }else{
        return data
    }
};


coreServer.addInterceptors = function (server) {
    server.interceptors.request.use(
        config  => {
            config.headers['token'] = sessionUtil.getItem('token');
            return config;
        },

        error => {
            // return Promise.reject(error)
        });

    // http response 拦截器
    server.interceptors.response.use(
        response => {
            let url = response.config.url;
            console.log(url)
            if(response.data.success){
                if(url.indexOf('/login') > -1 ){
                    sessionUtil.setItem("token", response.data.data.token.accessToken);
                    //expireTime : token失效时间（最后15分钟有操作刷新token）
                    sessionUtil.setItem("expireTime", response.data.data.token.expireTime);
                    //tokenUpdateTime : token更新的时间
                    sessionUtil.setItem("tokenUpdateTime", Date.now());
                }else{
                    //长时间不操作 , 会退出登录
                    if(validToken()){
                        if(aboutToExpir()){
                            //最后15分钟,刷新token
                            refreshToken();
                        }
                    }else{
                        //跳到登录页
                        interShow('token过期，请重新登录!', true);
                        return false;
                    }
                }
                if(url.indexOf('/token/refresh')>-1){
                    sessionUtil.setItem("token", response.data.data.accessToken);
                    //expireTime : token失效时间（最后15分钟有操作刷新token）
                    sessionUtil.setItem("expireTime", response.data.data.expireTime);
                    //tokenUpdateTime : token更新的时间
                    sessionUtil.setItem("tokenUpdateTime", Date.now());
                }
                //记录每个协议响应的实时时间戳(ms)
                sessionUtil.setItem("time", Date.now());
                console.log(new Date(sessionUtil.getItem('time')))
            }



            if (response.data != null) {
                switch (response.data.code) {
                    case 104:
                        if(router.history.current.fullPath !== '/'){
                            interShow('token过期，请重新登录!', true);
                        }
                        break;
                    case 208:
                        if(router.history.current.fullPath !== '/'){
                            interShow('权限不足，无法访问', false);
                        }
                        break;
                }
            }
            if (response.headers &&
                (response.headers['content-type'].indexOf('application/x-msdownload') != -1 ||
                    response.headers['content-type'].indexOf('octets/stream') != -1 ||
                    response.headers['content-type'].indexOf('application/octet-stream') != -1)) {


                var filename = "";
                if (response.headers["content-disposition"] && response.headers["content-disposition"].split(";").length > 1 &&
                    response.headers["content-disposition"].split(";")[1].split("filename=").length > 1) {
                    filename = response.headers["content-disposition"].split(";")[1].split("filename=")[1];
                    filename = Base64.decode(filename, "utf-8");
                } else {
                    filename = "none";
                }

                download(response.data, filename);

            } else if (response.config && response.config.responseType && response.config.responseType == 'blob') {
                download(response.data, 'error.json');
            }
            return response;

        },

        error => {
            return Promise.reject(error.response) // 返回接口返回的错误信息

        });
}
const interShow = function (msg, isredirect, url) {
    Vue.prototype.$message({
        message: msg,
        type: 'warning',
    })
    if (isredirect) {
        router.replace({
            path: '/'
        })
    }

}
const download = function (data, filename) {
    if (!data) {
        return
    }
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', filename)

    document.body.appendChild(link)
    link.click()
}



/**
 * 校验token是否失效
 */
function validToken(){
    let tokenUpdateTime = sessionUtil.getItem('tokenUpdateTime');
    let expireTime = sessionUtil.getItem('expireTime');       //1h
    // let expireTime = 1*60*60*1000;       //1h
    if((Date.now() - tokenUpdateTime) > expireTime){
        return false;
    }else{
        return true;
    }
}

/**
 * 刷新token
 */
function refreshToken(){
    //重新获取token
    loginApi.tokenRefresh()
        .then(function(res) {
            console.log(res)
        })
        .catch(function(res) {
            console.log(res);
        });
}

/**
 * token即将过期
 */
function aboutToExpir(){
    let time = sessionUtil.getItem('time');
    let expireTime = sessionUtil.getItem('expireTime');
    return ((new Date().getTime() - time) > (expireTime - critical));      //45
}



export default coreServer
