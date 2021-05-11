// 播放歌曲列表构造函数
export class playList{
    // 这里赋值无效!
    constructor(index, song, url = '') {
        // 搜索获得的歌曲在搜索结果中的索引
        this.index = index;
        this.title = song.name;
        this.artist = song.song;
        this.pic = song.pic;
        this.id = song.id;
        this.src = url;
    }
}
export class lyricItem{
    constructor(time, lyric) {
        this.time = time;
        this.lyric = lyric;
    }
}