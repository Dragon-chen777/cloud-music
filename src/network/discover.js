import {
    request
} from './request'

// 获取轮播图数据
export function _getBanner() {
    return request({
        url: '/banner'
    })
}

// 
export function _getPersonalized(config) {
    return request({
        url: "/personalized",
        params: {
            limit: config
        }
    })
}

// 独家放送(入口列表)
export function _getPrivateContent() {
    return request({
        url: '/personalized/privatecontent'
    })
}

// 获取新歌数据
export function _getNewSong() {
    return request({
        url: '/personalized/newsong'
    })
}
// 获取每日推荐(根据用户个性推荐)
export function _getRecommendResource(cookie, uid) {
    return request({
        url: '/recommend/songs',
        params: {
            cookie: cookie,
            uid: uid
        }
    })
}

// 热门歌单
export function _getMusicListHot() {
    return request({
        url: '/playlist/hot'
    })
}
// 
export function _getHighquality(cat, limit) {
    return request({
        url: '/top/playlist/highquality',
        params: {
            cat: cat,
            limit: limit,
            time: new Date().getTime()
        }
    })
}
// 获得歌手
export function _getArtist(area, type, limit) {
    return request({
        url: '/artist/list',
        params: {
            area: area,
            type: type,
            limit: limit
        }
    })
}
// 排行榜
export function _getRankList() {
    return request({
        url: '/toplist',
    })
}
// 最新音乐
export function _getTopSongs(type) {
    return request({
        url: '/top/song',
        params: {
            type: type
        }
    })
}