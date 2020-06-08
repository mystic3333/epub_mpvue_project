<template>
    <div class="category">
        <book
        :showBtn="false"
        :showTitle="false"
        :row="categoryList.length / 2"
        col="2"
        :data="categoryList"
        @onCategoryClick="onCategoryClick"
        ></book>
    </div>
</template>

<script>
import Book from '@/components/home/Book.vue'
import { getCategoryList } from '@/api/index.js'
import {setNavigationBarTitle} from '@/api/wechat.js'

export default {

  components: {
    Book
  },
  data () {
    return {
      categoryList: []
    }
  },
  mounted () {
    getCategoryList().then(res => {
      this.categoryList = res.data.data
      setNavigationBarTitle('所有分类')
    })
  },
  methods: {
    onCategoryClick (book, text = 'categoryId') {
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