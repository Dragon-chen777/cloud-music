# clound-music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### 网易云音乐Api: https://github.com/Binaryify/NeteaseCloudMusicApi
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 代码行数
约7700
### 路由跳转
#### 发现音乐:/discover
1. 个性推荐 /individ 
```
    每日歌单 /daymusic 一级

    歌单 /musiclistdetail/:id/:time 一级
    id:歌单的id
    time:当前请求时间
```
2. 歌单 /category
3. 排行榜 /ranklist
4. 歌手 /artist
```
   专辑  /artist/album
   MV    /artist/mv
   描述  /artist/desc
   相似歌手 /artist/simi
```
5. 新歌 /newsongs
6. MV /mv


#### 搜索 /search/:key
key:搜索关键字

#### 全部MV /allmv
```
    播放MV /playmv/:id (一级路由)
    id:所选mv的id
```




### 网络配置
#### 发现音乐 discover
```
// 个性推荐
1. 请求轮播图片 _getBanner()     /banner
2. 请求每日推荐 _getRecommendResource() /recommend/songs    cookie:用户cookie   uid:用户uid
3. 请求推荐歌单 _getPersonalized(limit)   /personalized     limit: 请求数量（已登录9 未登录9+1）
4. 请求独家放送 _getPrivateContent()    /personalized/privatecontent
5. 请求最新音乐 _getNewSong()   /personalized/newsong

//
```
#### 搜索 search
```
1. 热搜 _hotSearchDetail()  /search/hot/detail
2. 搜索建议 _Suggest(keywords)  /search/suggest     keywords:输入的关键字
3. 搜索 _Search(keywords)   /search     keywords:输入的关键字  [limit]:请求数量   返回搜索到的歌曲的id
```


#### 其他数据 detail
```
1. 歌单 _getMusicListDetail(id) /playlist/detail    id:歌单的id     获得数据包含歌曲的id
2. 歌曲详细信息 _getSongsDetail(ids)    /song/detail    ids:所有歌曲的id数组    获得数据包含id、title、artist等
3. 歌曲播放路径 _getMusicUrl(id)    /song/url   id:歌曲id
4. 歌曲歌词 _getLyric(id)   /lyric  id:歌曲id

5. 歌曲评论 _musicRecommend(id,limit)   /comment/music  id:歌曲id   limit:获取推荐歌曲数量
6. 添加评论 _pushCommend(cookie,id,content)     /comment    t:1发送  type:0歌曲  content:评论内容   id:对应资源id 

7. 歌单收藏者 _getSub(id,limit)     /playlist/subscribers   id:歌单id limit:歌单评论数量

汇总构造函数songDetail(songs) 歌曲详细信息  id name album song pic time
```
