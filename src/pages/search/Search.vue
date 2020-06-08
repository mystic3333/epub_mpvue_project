<template>
    <div class="search">
        <!-- searchBar组件 -->
        <search-bar
        :focus="searchBarFocus"
        :hotSearch="hotSearchKeyword"
        @onChange="onSearchValueChange"
        @onClear="onClear"
        @onComfirm="onComfirm"
        ref="searchBar"
        ></search-bar>

        <!-- 热门搜索组件 -->
        <search-group
        headerText="热门搜索"
        btnText="换一批"
        :value="hotSearchList"
        @onBtnTextClick="onChangeHotSearch"
        @onTagClick="onHotSearchClick"
        v-if="hotSearchList.length > 0 && !isshowList"
        ></search-group>

        <!-- 历史搜索组件 -->
        <search-group
        headerText="历史搜索"
        btnText="清除记录"
        :value="historySearchValue"
        @onBtnTextClick="onHistoryClearClick"
        @onTagClick="onHistorySearchClick"
        v-if="historySearchValue.length > 0 && !isshowList"
        ></search-group>

        <!-- searchList -->
        <search-list
        :data="searchList"
        @showList="showList"
        v-if="isshowList"
        @onBookClick="onBookClick"
        ></search-list>
    </div>
</template>

<script>
import SearchList from '@/components/search/SearchList.vue'
import SearchGroup from '@/components/search/SearchGroup.vue'
import SearchBar from '@/components/home/Search.vue'
import { getStorageSync, setStorageSync, showToast } from '@/api/wechat.js'
import { getList, getHotSearchList } from '@/api/index.js'

export default {

  components: {
    SearchGroup,
    SearchList,
    SearchBar
  },
  computed: {
    hotSearchList () {
      let _hotSearchList = []
      this.hotSearch.forEach(item => {
        _hotSearchList.push(item.title)
      })
      return _hotSearchList
    },
    isshowList () {
      const keys = Object.keys(this.searchList)
      return keys.length > 0
    },
    data () {
      return {
        items: this.items,
        list: this.list
      }
    }
  },
  data () {
    return {
      page: 1,
      searchBarFocus: true,
      hotSearchKeyword: '',
      hotSearch: [],
      openId: '',
      hotSearchValue: [],
      historySearchValue: [],
      searchList: {}
    }
  },
  methods: {
    onBookClick (book) {
      this.$router.push({
        path: '/pages/book/main',
        query: book
      })
    },
    onComfirm (keyword) {
      if (!keyword && keyword.trim().length === 0) {
        // 没有关键字, 则通过热门搜索词进行搜索
        keyword = this.hotSearchKeyword
        this.$refs.searchBar.setValue(this.hotSearchKeyword)
      } else {
        // 如果有关键字, 则通过关键字搜索, 加入搜索历史
      }
      this.search(keyword)

      if (!this.historySearchValue.includes(keyword)) {
        this.historySearchValue.push(keyword)
        setStorageSync('history', this.historySearchValue)
      }

      // 确定的时候失去焦点
      this.searchBarFocus = false
    },
    onClear () {
      this.searchList = {}
    },
    onSearchValueChange (keyword) {
      if (!keyword || keyword.trim().length === 0) {
        this.searchList = {}
        return
      }
      this.page = 1
      this.search(keyword)
    },
    search (keyword) {
      getList({
        keyword, openId: this.openId
      }).then(response => {
        console.log(response)
        this.searchList = response.data.data
      })
    },
    onChangeHotSearch () {

    },
    onHistoryClearClick () {
      this.historySearchValue = []
      setStorageSync('history', [])
    },
    onHistorySearchClick (text) {
      console.log(text)
      this.search(text)
      this.$refs.searchBar.setValue(text)
    },
    onHotSearchClick () {},

    showList (text, subTitle) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          text, subTitle
        }
      })
      console.log(text, subTitle)
    }
  },
  mounted () {
    // 重置page参数
    this.page = 1

    // 获取openId
    this.openId = getStorageSync('openId').openid

    // 获取热门搜索关键字初始值
    this.hotSearchKeyword = this.$route.query.hotSearch

    // 获取热门搜索列表
    getHotSearchList({params: this.hotSearchKeyword}).then(response => {
      this.hotSearch = response.data.data
    })

    // 读取历史搜索记录的本地缓存
    this.historySearchValue = getStorageSync('history') || []
  },
  onPageScroll () {
    // 页面滚动的时候设置失去焦点, 需要在真机上调试
    if (this.searchBarFocus) {
      this.searchBarFocus = false
    }
  },
  onReachBottom () {
    if (this.isshowList) {
      // 触底的时候自动加载数据
      this.page++
      // 获取搜索关键字
      const keyword = this.$refs.searchBar.getValue()
      getList({
        keyword, openId: this.openId, page: this.page
      }).then(response => {
        const {book} = response.data.data
        if (book && book.length > 0) {
          this.searchList.book.push(...book)
        } else {
          showToast('已经没有更多数据啦...')
        }
      })
    }
  }
}
</script>

<style scoped>
.search {
    margin: 0px 20px;
    box-sizing: border-box;
}
</style>