import {
    _getMusicUrl
} from "network/detail"
import {
    playList
} from "components/content/playmusic/playList";
// 
export const indexMixin = {
    methods: {
        // 这里赋值无效!
        PlayMusic(index = 0) {
            // 获取当前路径
            let path = this.$route.path;
            // 限制200首以内
            let musiclist;
            if (this.musiclist.length >= 200) {
                musiclist = this.musiclist.slice(0, 199)
            } else {
                musiclist = this.musiclist
            }

            let url = null,
                // 搜索歌曲结果列表
                playlist = [];
            for (let i = 0, length = musiclist.length; i < length; i++) {
                // 发送每首歌曲信息里的id请求得到歌曲播放路径
                let getUrl = _getMusicUrl(musiclist[i].id).then(res => {
                    url = res.data.data[0].url;
                    let song = new playList(i, musiclist[i], url);
                    playlist.push(song);
                    if (i == musiclist.length - 1) {
                        this.$bus.$emit("playMusic", playlist, index, path, musiclist)
                    }
                })
            }
        }
    }
}