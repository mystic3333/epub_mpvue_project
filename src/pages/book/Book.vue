<template>
    <div class="book">
      <!-- 图书信息组件 -->
      <detail-book
      :data="book"
      ></detail-book>

      <!-- 图书评分状态组件 -->
      <detail-stat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
      ></detail-stat>

      <!-- 图书评分组件 -->
      <detail-rate
      @onRateChange="onRateChange"
      ></detail-rate>

      <!-- 目录组件 -->
      <detail-contents
      :contents="contents"
      ></detail-contents>

      <!-- 底部按钮 -->
      <detail-bottom
      :isInShelf="isInShelf"
      @onShelfClick="onShelfClick"
      @onReadClick="onReadClick"
      />
    </div>
</template>

<script>
import DetailBook from '@/components/detail/DetailBook.vue'
import DetailRate from '@/components/detail/DetailRate.vue'
import DetailStat from '@/components/detail/DetailStat.vue'
import DetailContents from '@/components/detail/DetailContents.vue'
import DetailBottom from '@/components/detail/DetailBottom.vue'
import {getBookDetail, rankSave, getContents, getShelfStatus, bookShelfSave, bookShelfRemove} from '@/api'
import {getStorageSync} from '@/api/wechat.js'

export default {
  components: {
    DetailBook,
    DetailRate,
    DetailStat,
    DetailContents,
    DetailBottom
  },
  data () {
    return {
      book: {},
      contents: [],
      isInShelf: Boolean,
      fileName: String,
      openId: ''
    }
  },
  methods: {
    onReadClick () {
      console.log('read book..')
    },
    onShelfClick () {
      console.log('handle shelf')
      const openId = getStorageSync('openId')
      const {fileName} = this.$route.query
      if (openId && fileName) {
        if (!this.isInShelf) {
          bookShelfSave({openId, fileName}).then(res => {
            this.getShelfStat()
          })
        } else {
          bookShelfRemove({openId, fileName}).then(res => {
            this.getShelfStat()
          })
        }
      }
    },
    getShelfStat () {
      const openId = getStorageSync('openId')
      const {fileName} = this.$route.query
      if (openId && fileName) {
        getShelfStatus({fileName, openId}).then(res => {
          if (res.data.data.length === 0) {
            this.isInShelf = false
          } else {
            this.isInShelf = true
          }
        })
      }
    },
    getBookContents () {
      const {fileName} = this.$route.query
      if (fileName) {
        getContents({fileName}).then(res => {
          this.contents = res.data.data
          // console.log('contents', res)
        })
      }
    },
    onRateChange (detail) {
      const openId = getStorageSync('openId')
      const {fileName} = this.$route.query
      if (openId && fileName) {
        rankSave({openId, fileName, rank: detail}).then(res => {
          this.getDetail()
        })
      }
    },
    getDetail () {
      const openId = getStorageSync('openId')
      const {fileName} = this.$route.query
      if (openId && fileName) {
        getBookDetail({fileName, openId}).then(res => {
          this.book = res.data.data
        })
      }
    },
    init () {
      this.getDetail()
      this.getBookContents()
      this.getShelfStat()
    }
  },
  mounted () {
    this.init()
  },
  computed: {

  }
}
</script>

<style scoped>
.book {
  margin: 0px 20px;
  box-sizing: border-box;
}
/* .rate_and_start_wrapper {
  margin: 20px 20px 0px 20px;
  box-sizing: border-box;
} */
</style>