import {
    request
} from 'network/request'
//  检测手机号码是否已注册,传入参数phone
export function _phoneVerify(phone) {
    return request({
        url: '/cellphone/existence/check',
        params: {
            phone: phone
        }
    })
}
// 手机号登录
export function _login(phone,password) {
    return request({
        url: '/login/cellphone',
        params: {
            phone: phone,
            password:password
        }
    })
}
// 获取用户歌单
export function _getSongList(id) {
    return request({
        url: '/user/playlist',
        params: {
            uid:id
        }
    })
}