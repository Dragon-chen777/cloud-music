import {
    request
} from './request'

import {
    formatDate
} from "assets/common/tool"
// 获取歌单详细信息
export function _getMusicListDetail(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id: id
        }
    })
}

// 获取歌曲
export function _getMusicUrl(id) {
    return request({
        url: '/song/url',
        params: {
            id: id
        }
    })
}
// 获取歌词
export function _getLyric(id) {
    return request({
        url: '/lyric',
        params: {
            id: id
        }
    })
}
// 获取歌曲详细信息
export function _getSongsDetail(ids) {
    return request({
        url: '/song/detail',
        params: {
            ids: ids
        }
    })
}
// 获取歌曲推荐
export function _musicRecommend(id, limit) {
    return request({
        url: '/comment/music',
        params: {
            id: id,
            limit: limit
        }
    })
}
// 添加评论
export function _pushCommend(cookie, id, content) {
    return request({
        url: "/comment",
        params: {
            cookie: cookie,
            t: 1,
            type: 2,
            id: id,
            content: content
        }
    })
}
//获取歌单评论
export function _getRecommends(id, limit) {
    return request({
        url: "/comment/playlist",
        params: {
            id: id,
            limit:limit
        }
    })
}
// 歌单收藏者
export function _getSub(id, limit) {
    return request({
        url: '/playlist/subscribers',
        params: {
            id: id,
            limit
        }
    })
}
// 歌曲详细信息汇总
export class songDetail {
    constructor(songs) {
        this.id = songs[0].id;
        this.name = songs[0].name;
        // 专辑名
        this.album = songs[0].al.name;
        // 歌手
        this.song = songs[0].ar[0].name;
        // 歌曲封面路径
        this.pic = songs[0].al.picUrl;
        // 歌曲发布时间
        this.time = formatDate(new Date(songs[0].dt), 'mm:ss')
    }
}
export class baseInfo {
    constructor(playlist) {
        this.img = playlist.coverImgUrl;
        this.title = playlist.description;
        this.name = playlist.name;
        this.shareCount = playlist.shareCount;
        this.subscribedCount = playlist.subscribedCount;
        this.playCount = playlist.playCount;
        this.trackCount = playlist.trackCount;
        this.tags = playlist.tags[0];
    }
}