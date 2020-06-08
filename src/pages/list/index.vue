<template>
    <div class="list">
        <search-table
        :data="searchTableData"
        @onClick="onBookClick"
        ></search-table>
    </div>
</template>

<script>
import SearchTable from '@/components/search/SearchTable.vue'
import {getSearchList} from '@/api/index.js'
import {setNavigationBarTitle, showToast} from '@/api/wechat.js'

export default {
  components: {
    SearchTable
  },
  data () {
    return {
      page: 1,
      searchTableData: []
    }
  },
  methods: {
    onBookClick (book) {
      console.log(book)
      this.$router.push({
        path: '/pages/book/main',
        query: book
      })
    },
    getList () {
      const {text, subTitle} = this.$route.query
      let params = {}
      params[subTitle] = text
      params.page = this.page

      getSearchList(params).then(res => {
        this.searchTableData = res.data.data
        setNavigationBarTitle('图书列表')
      })
    }
  },
  mounted () {
    this.page = 1
    this.getList()
  },
  onReachBottom () {
    this.page++
    const {text, subTitle} = this.$route.query
    let params = {}
    params[subTitle] = text
    params.page = this.page

    getSearchList(params).then(res => {
      if (res.data.data.length > 0) {
        this.searchTableData.push(...res.data.data)
      } else {
        showToast('没有更多数据啦~')
      }
    })
  }
}
</script>

<style scoped>
.list {
    margin: 0px 20px;
    box-sizing: border-box;
}
</style>