<template>
  <div class="detail_book">
    <div class="detail_book_img_wrapper">
      <image-view
      :src="data.cover"
      ></image-view>
    </div>    
    <div class="detail_book_info_wrapper">
      <div class="detail_book_info_title">{{ data.title }}</div>
      <div class="detail_book_info_author">{{ data.author }}</div>
      <div class="detail_book_info_desc">{{  data.categoryText }}</div>
    </div>
  </div>
</template>

<script>
import ImageView from '@/components/base/ImageView.vue'

export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      data: {}
    }
  },
  components: {
    ImageView
  },
  mounted () {
  }
}
</script>

<style scoped>
.detail_book {
  display: flex;
  width: 100%;
}
.detail_book_img_wrapper {
  width: 108px;

}
.detail_book_info_wrapper {
  padding: 20px 0px 0px 20px;
  width: 200px;
}
.detail_book_info_title {
  font-size: 22px;
  color: #333333;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail_book_info_author {
  font-size: 16px;
  color: #333333;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 8px;
}
.detail_book_info_desc {
  font-size: 14px;
  color: #868686;
  line-height: 28px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>