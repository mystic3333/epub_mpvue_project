<template>
    <div class="search_table">
      <div class="content_wrapper" v-for="(book, index) in data" :key="index" @click="onClick(book)">
        <div class="search_table_img_wrapper">
            <image-view
            :src="book.cover"
            ></image-view>
        </div>
        <div class="search_table_info_wrapper"  >
            <div class="search_table_title">{{ book.title }}</div>
            <div class="search_table_author">{{ book.author }}</div>
            <div class="search_table_category">{{ book.categoryText }}</div>
        </div>
      </div>
        
    </div>
</template>

<script>
import ImageView from '@/components/base/ImageView.vue'
export default {
  props: {
    data: Array
  },
  components: {
    ImageView
  },
  methods: {
    onClick (book) {
      this.$emit('onClick', book)
    }
  }

}
</script>

<style scoped>
.search_table {
  margin-top: 30px;
}
.content_wrapper {
  display: flex;
  margin-top: 15px;
}
.search_table_img_wrapper {
  width: 47px;
  height: 68px;
}
.search_table_info_wrapper {
  margin-left: 15px;
}
.search_table_title {
  font-size: 16px;
  color: #333333;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.search_table_author {
  font-size: 13px;
  color: rgba(0,0,0,0.65);
  line-height: 18px;
  margin-top: 5px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.search_table_category {
  font-size: 13px;
  color: rgba(0,0,0,0.45);
  line-height: 18px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>