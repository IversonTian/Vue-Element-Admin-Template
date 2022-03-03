import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    // async: true 解决配置主题颜色时报错:NetworkError: Failed to execute 'send' on 'XMLHttpRequest': Failed to load 'https://unpkg.com/element-ui@...
    async: true
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        // 处理请求错误:例如调试
        console.log(error);
        return Promise.reject(error);
    }
),

// 响应拦截器
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // code为非20000是抛错 可结合自己业务进行修改
        if (res.code !== 20000) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000,
            });

            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('你已被登出,可以取消继续留在该页面,或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    store.dispatch('login/resetToken').then(() => {
                        location.reload();
                    });
                });
            }
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        // 弹出错误提示信息
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error);
    }
);

export default service;