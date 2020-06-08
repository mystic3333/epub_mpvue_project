<template>
    <div class="search_group">
        <div class="search_group_header">
            <div class="search_group_header">{{ headerText }}</div>
            <div class="search_group_btn_text" @click="onBtnClick">{{ btnText }}</div>
        </div>
        <div class="tag_group">
            <div class="tag_group_inner" v-for="(tag, index) in value" :key="index">
                <tag 
                :text="tag"
                @onTagClick="onTagClick(tag, index)"></tag>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from '@/components/base/Tag.vue'
export default {
  props: {
    headerText: String,
    btnText: String,
    value: Array
  },
  components: {
    Tag
  },
  methods: {
    onBtnClick () {
      this.$emit('onBtnTextClick')
    },
    onTagClick (tag, index) {
      this.$emit('onTagClick', tag, index)
    }
  }
}
</script>

<style scoped> 
.search_group_header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-top: 10px;
}
.search_group_header {
    color: #333333;
}
.search_group_btn_text {
    color: #3696EF;
}
.tag_group {
    display: flex;
    flex-flow: row wrap;
    margin-top: 15px;
}
.tag_group_inner {
    width: 150px;
    margin-top: 15px;
}
</style>