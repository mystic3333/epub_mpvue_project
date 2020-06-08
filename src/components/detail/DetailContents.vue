<template>
    <div class="detail_contents">
        <div class="title">目录</div>
        <div class="contents_wrapper" v-for="(item, index) in contents" :key="index">

          <div class="chapter" 
          @click="readBook"
          :style="'{marginLeft: ' + item.level*15 +'px}'"
          >{{ item.fileName }}</div>

        </div>
    </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      default: []
    }
  },
  methods: {
    readBook () {
      console.log('read book...')
    }
  }
}
</script>

<style scoped>
.detail_contents {
  margin-bottom: 73px;
}

.title {
    font-size: 22px;
    color: #333333;
}
.chapter {
    font-size: 15px;
    color: #868686;
    line-height: 14px;
    margin-top: 32px;
}
.contents_wrapper {
}
</style>