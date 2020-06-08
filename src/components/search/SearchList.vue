<template>
    <div class="search_list">
        <search-banner
        icon="apps-o"
        :title="category"
        subTitle="category"
        @onClick="showList(category, 'category')"
        v-if="category"
        ></search-banner>
        <search-banner
        icon="contact"
        :title="author"
        subTitle="author"
        @onClick="showList(author, 'author')"
        v-if="author"
        ></search-banner>
        <search-banner
        icon="comment-o"
        :title="publisher"
        subTitle="publisher"
        @onClick="showList(publisher, 'publisher')"
        v-if="publisher"
        ></search-banner>

        <search-table
        :data="data.book"
        @onClick="onBookClick"
        ></search-table>
    </div>
</template>

<script>
import SearchBanner from '@/components/search/SearchBanner.vue'
import SearchTable from '@/components/search/SearchTable.vue'

export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    SearchBanner,
    SearchTable
  },
  computed: {
    category () {
      if (this.data && this.data.category && this.data.category.length > 0) {
        const category = this.data.category[0].categoryText
        console.log(category)
        return category
      } else {
        return null
      }
    },
    author () {
      if (this.data && this.data.author && this.data.author.length > 0) {
        return this.data.author[0].author
      } else {
        return null
      }
    },
    publisher () {
      if (this.data && this.data.publisher && this.data.publisher.length > 0) {
        return this.data.publisher[0].publisher
      } else {
        return null
      }
    }
  },
  methods: {
    showList (title, subTitle) {
      this.$emit('showList', title, subTitle)
    },
    onBookClick (book) {
      this.$emit('onBookClick', book)
      console.log(book)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>