import request from '@/utils/request'

// 用户登录
export function login(data) {
    return request({
        url: '/login/login',
        method: 'post',
        data,
    })
}

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/login/getInfo',
        method: 'get',
        params: {
            token
        }
    })
}

// 退出登录
export function logout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}