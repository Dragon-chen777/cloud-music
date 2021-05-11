export const tableMixin = {
    methods: {
        // 序列化数字
        setSerial(index) {
            return index + 1 <= 9 ? '0' + (index + 1) : index + 1
        },
        // 判断是否为偶数
        setBackColor(index) {
            return index % 2 == 0 ? false : true
        },
        // 歌曲项目点击
        musicItemClick(index) {
            // PlayMusic
            // 如果播放音乐列表展示
            if (this.$parent.$parent.$el.className.indexOf('play-music-list')!=-1) {
                this.$bus.$emit('PlayMusicListItem', index)
                return
            }
            this.$emit('musicItemClick',index)
        }
    }
}