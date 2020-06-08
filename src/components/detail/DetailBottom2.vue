<template>
  <div class="detail-bottom">
    <div class="detail-btn-wrapper">
      <van-button
        :custom-class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
        round
        @click="handleShelf"
      >
        {{isInShelf ? '移出书架' : '加入书架'}}
      </van-button>
    </div>
    <div class="detail-btn-wrapper">
      <van-button
        custom-class="detail-btn-read"
        round
        @click="() => readBook()"
      >
        阅读
      </van-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isInShelf: Boolean
    },
    methods: {
      handleShelf () {
        this.$emit('handleShelf')
      },
      readBook () {
        this.$emit('readBook')
      }
    }
  }
</script>