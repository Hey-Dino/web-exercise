import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/admin/acl/index/login',
        method: 'POST',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/admin/acl/index/info',
        method: 'GET',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/admin/acl/index/logout',
        method: 'POST'
    })
}
