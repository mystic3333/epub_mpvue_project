<template>
  <div>
    <div class="index" v-if="isAuth">
      <!-- 搜索组件 -->
      <search
      disabled
      :hotSearch="hotSearch"
      @onClick="onSearchBarClick"
      ></search>

      <!-- 图片组件 -->
      <!-- mode: widthFix->宽度自适应 scrollToFit->高度自适应 -->
      <!-- <image-view
      src="https://www.youbaobao.xyz/mpvue-res/big.jpg"
      height="100px"
      ></image-view>  -->

      <!-- 图书组件 -->
      <card
      :data="homeCard"
      @onBookClick="onBookClick"
      ></card>

      <!-- 广告栏组件 -->
      <banner
      :title=banner.title
      :sub_title=banner.subTitle
      :img=banner.img
      @onClick="onBannerClick"
      btnText="换一批"
      ></banner>

      <!-- 推荐组件 -->
      <book
      title="为你推荐"
      row="1"
      col="3"
      mode="col"
      :data="recommend"
      @onBookClick="onBookClick"
      @onMoreClick="onMoreClick('recommend')"
      ></book>

      <!-- 免费阅读 -->
      <book
      title="免费阅读"
      row="2"
      col="2"
      mode="row"
      :data="freeRead"
      @onBookClick="onBookClick"
      @onMoreClick="onMoreClick('freeRead')"
      ></book>

      <!-- 当前最热 -->
      <book
      title="当前最热"
      row="1"
      col="4"
      mode="col"
      :data="hotBook"
      @onBookClick="onBookClick"
      @onMoreClick="onMoreClick('hotBook')"
      ></book>

      <!-- 分类 -->
      <book
      title="分类"
      row="3"
      col="2"
      mode="category"
      :data="category"
      btnText="显示全部"
      @onMoreClick="onMoreClick('category')"
      @onCategoryClick="onCategoryClick"
      ></book>
    </div>
    <auth v-if="!isAuth" @getUserInfo="init"></auth>
  </div>
</template>

<script>
import Card from '@/components/home/card.vue'
import Search from '@/components/home/Search.vue'
import ImageView from '@/components/base/ImageView.vue'
import Banner from '@/components/home/Banner.vue'
import Book from '@/components/home/Book.vue'
import Auth from '@/components/base/Auth.vue'
import {getHomeData, recommend, freeRead, hotBook, register} from '@/api'
import {getSetting,
  getUserInfo,
  setStorageSync,
  getStorageSync,
  login,
  showLoading,
  hideLoading
} from '@/api/wechat.js'

export default {
  components: {
    Search,
    ImageView,
    Card,
    Banner,
    Book,
    Auth
  },
  data () {
    return {
      isAuth: false,
      recommend: [],
      category: [],
      freeRead: [],
      banner: {},
      hotBook: [],
      hotSearch: '',
      homeCard: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getSetting()
    },
    getUserInfo () {
      const onGetOpenIdComplete = (openId, userInfo) => {
        this.getHomedata(openId, userInfo)
        register(openId, userInfo)
      }
      getUserInfo(
        (userInfo) => {
          console.log(userInfo)
          setStorageSync('userInfo', userInfo)
          const openId = getStorageSync('openId')
          if (!openId || openId.length === 0) {
            console.log('获取openId')
            // 获取openId
            login((openId) => onGetOpenIdComplete(openId, userInfo))
          } else {
            console.log('已经获得openId')
            onGetOpenIdComplete(openId, userInfo)
          }
        },
        () => {
          console.log('fail')
        }
      )
    },
    getSetting () {
      getSetting('userInfo',
        () => {
          console.log('isAuth')
          this.isAuth = true
          showLoading('数据加载中...')
          this.getUserInfo()
        },
        () => {
          this.isAuth = false
        }
      )
    },

    getHomedata (openId, userInfo) {
      getHomeData({openId}).then(res => {
        const {
          data: {
            category,
            recommend,
            hotBook,
            hotSearch: {
              keyword
            },
            shelf,
            banner,
            freeRead,
            shelfCount
          }
        } = res.data
        this.category = category
        this.recommend = recommend
        this.banner = banner
        this.shelf = shelf
        this.freeRead = freeRead
        this.hotBook = hotBook
        this.hotSearch = keyword
        this.homeCard = {
          bookList: shelf,
          num: shelfCount,
          userInfo
        }
        hideLoading()
      }).catch(e => {
        hideLoading()
      })
    },
    onSearchBarClick () {
      // 跳转至搜索页面
      console.log(this.hotSearch)
      this.$router.push({
        path: '/pages/search/main',
        query: {
          hotSearch: this.hotSearch
        }
      })
    },
    onBannerClick () {
      console.log('on banner click')
    },
    onBookClick (book) {
      console.log(book)
      this.$router.push({
        path: '/pages/book/main',
        query: book
      })
    },
    onMoreClick (key) {
      console.log('on more book click...')
      console.log(key)
      switch (key) {
        case 'recommend':
          recommend().then(res => {
            this.recommend = res.data.data
          })
          break
        case 'freeRead':
          freeRead().then(res => {
            this.freeRead = res.data.data
          })
          break
        case 'hotBook':
          hotBook().then(res => {
            this.hotBook = res.data.data
          })
          break
        case 'category':
          this.$router.push('/pages/category/main')
      }
    },
    onCategoryClick (book, text = 'categoryId') {
      console.log('category', book, text)
      this.$router.push({
        path: '/pages/list/main',
        query: {
          text: book.category,
          subTitle: text
        }
      })
    }
  }
}
</script>

<style scoped>

</style>