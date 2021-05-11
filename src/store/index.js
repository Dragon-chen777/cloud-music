import Vue from 'vue'
import Vuex from 'vuex'
import {
  _getSongList
} from 'network/user/userVerify'
Vue.use(Vuex)
const state = {
  // 用户相关
  user: null,
  uid: null,
  cookie: '',

  // 歌单
  songList: [{
      name: "华语电影台词对白｜念念不忘",
      coverImgUrl: "http://p2.music.126.net/JnQmWLPgIh97PZnBtpPKOA==/109951164274045767.jpg",
      id: 2166181332,
    },
    {
      name: "最怕温柔与爱抵不过新鲜感",
      coverImgUrl: "http://p2.music.126.net/mmXG3zxDtOgjQNU4p8IFWA==/109951165497118103.jpg",
      id: 5351072273,
    },
    {
      name: "聆听藏乐，呼吸高海拔之纯净",
      coverImgUrl: "http://p1.music.126.net/QH-GO1IV5dr4QK9-fouF6A==/7948369558074504.jpg",
      id: 86112285,
    },
    {
      name: "「星轨旋律」揽下整个星空的纯音乐",
      coverImgUrl: "http://p1.music.126.net/AyrD79j1MbrOkUX0TId4Qw==/19023750184256637.jpg",
      id: 995552555,
    },
    {
      name: "声光沉醉，电影配乐里的爵士情调",
      coverImgUrl: "http://p2.music.126.net/jCgROvSRgRUh-0AXlishVw==/109951164395470640.jpg",
      id: 3006650739,
    },
  ],
  // 播放歌单
  playlist: [],
  // 歌手
  artist: null,
  isShowLogin: false,
  isloading : false,
};
export default new Vuex.Store({
  state,
  mutations: {
    // 添加播放列表
    addPlayList(state, list) {
      state.playlist = list
    },
    // login 展示
    showLogin(state) {
      state.isShowLogin = true
    },
    hiddenLogin(state) {
      state.isShowLogin = false
    },
    // 添加用户
    addUser(state, obj) {
      state.user = obj;
      state.uid = state.user.profile.userId;
      state.cookie = obj.cookie;
      // 获取用户歌单
      _getSongList(state.uid).then(res => {
        state.songList = res.data.playlist
      })
    },
    addArtist(state, artist) {
      state.artist = artist;
    },
    // 加载动画
    showLoading(state) {
      state.isloading = true;
    },
    hiddenLoading(state) {
      state.isloading = false;
    }
  },
  actions: {},
  modules: {}
})