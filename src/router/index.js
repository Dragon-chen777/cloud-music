import Vue from 'vue'
import VueRouter from 'vue-router'


// 发现音乐
const DiscoverMusic = () => import('views/discover/DiscoverMusic')
const Individuation=()=>import('views/discover/childRouter/Individuation')
const MusicListCategory=()=>import('views/discover/childRouter/MusicListCategory')
const MusicRankList=()=>import('views/discover/childRouter/MusicRankList')
const ArtistCategory=()=>import('views/discover/childRouter/ArtistCategory')
const NewSongsR=()=>import('views/discover/childRouter/NewSongsR')
const MV = () => import('views/mv/MV')

// 歌单详细
const MusicListDetail=()=>import('views/musicListDetail/MusicListDetail')
const DayMusicListDetail=()=>import('views/musicListDetail/DayMusicListDetail')

// 歌手
const ArtistDetail=()=>import('views/artistdetail/ArtistDetail')
const ArtistAlbum=()=>import('views/artistdetail/childRouter/ArtistAlbum')
const ArtistMV=()=>import('views/artistdetail/childRouter/ArtistMV')
const ArtistDescDetail=()=>import('views/artistdetail/childRouter/ArtistDescDetail')
const SimiArtist=()=>import('views/artistdetail/childRouter/SimiArtist')

// 搜索列表
const SearchList=()=>import('views/search/SearchList')

// MV
const PlayMV=()=>import('views/mv/PlayMV')
const AllMV=()=>import('views/mv/AllMV')
Vue.use(VueRouter)


const routes = [{
    path: '',
    redirect: '/discover'
  },
  // 发现音乐 
  {
    path: '/discover',
    component: DiscoverMusic,
    children: [{
        path: '/',
        redirect: '/discover/individ'
      },
      {
        // 个性推荐
        path: '/discover/individ',
        component: Individuation
      },
      {
        // 歌单
        path: '/discover/category',
        component: MusicListCategory
      },
      {
        // 排行榜
        path: '/discover/ranklist',
        component: MusicRankList
      },
      {
        // 歌手
        path: '/discover/artist',
        component: ArtistCategory
      },
      {
        // 最新音乐
        path: '/discover/newsongs',
        component: NewSongsR
      },
      {
        // MV
        path: '/discover/mv',
        component: MV
      },
    ]
  },
  // 歌单详细
  {
    path: '/musiclistdetail/:id/:time',
    name: 'detail',
    component:MusicListDetail,
  },
  {
    path:'/daymusic',
    component:DayMusicListDetail
  },
  // 歌手详细
  {
    path:'/artist',
    component:ArtistDetail,
    children:[
      {
        path:'/',
        redirect:'/artist/album'
      },
      {
        path:'/artist/album',
        component:ArtistAlbum
      },
      {
        path:'/artist/mv',
        component:ArtistMV
      },
      {
        path:'/artist/desc',
        component:ArtistDescDetail
      },
      {
        path:'/artist/simi',
        component:SimiArtist
      },
    ]
  },
  // 搜索列表
  {
    path:'/search/:key',
    component:SearchList
  },
  //  MV
  {
    path:'/playmv/:id',
    component:PlayMV
  },
  {
    path:'/allmv',
    component:AllMV
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router