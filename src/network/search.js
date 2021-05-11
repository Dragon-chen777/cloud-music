import {request} from "./request"

// 热搜
export function _hotSearchDetail() {
    return request({
        url:'/search/hot/detail'
    })
}

// 搜索关键字补选
export function _Suggest(keywords) {
    return request({
        url: '/search/suggest',
        params: {
            keywords:keywords
        }
    })
}

// 搜索
export function _Search(key) {
    return request({
        url: '/search',
        params: {
            keywords: key,
            limit:27
        }
    })
}