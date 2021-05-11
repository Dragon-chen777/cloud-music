import {
    request
} from './request'

// 整合
export class MV {
    constructor(id, cover, name, artist, count) {
        this.id = id;
        this.cover = cover;
        this.name = name;
        this.artist = artist;
        this.count = count;
    }
}

// 获得全部MV
export function _AllMv(area = '全部', type = '全部', order = '最新', limit) {
    return request({
        url: '/mv/all',
        params: {
            area: area,
            type: type,
            order: order,
            limit: limit
        }
    })
}
// 最新MV
export function _getNewMV(limit) {
    return request({
        url: '/mv/first',
        params: {
            limit: limit
        }
    })
}
// MV排行榜
export function _getTopMv(limit = 10) {
    return request({
        url: '/top/mv',
        params: {
            limit: limit
        }
    })
}
// MV详细
export function _getMvDetail(id) {
    return request({
        url: '/mv/detail',
        params: {
            mvid:id
        }
    })
}
// mv播放路径
export function _getMVUrl(id) {
    return request({
        url: '/mv/url',
        params: {
            id:id
        }
    })
}
// mv评论
export function _getMVComment(id,limit) {
    return request({
        url: '/comment/mv',
        params: {
            id: id,
            limit:limit
        }
    })
}
// 相关推荐mv
export function _getSimiMv(id) {
    return request({
        url: '/simi/mv',
        params: {
            mvid:id
        }
    })
}