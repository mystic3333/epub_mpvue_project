<template>
    <div class="search">
        <div class="search_warpper" @click="onSearchBarClick">
            <van-icon name="search" class="search_icon"></van-icon>
            <input 
            placeholder-style="color: ABD4BE"
            type="text" 
            class="input_search"
            :focus="focus"
            :disabled="disabled"
            :placeholder="hotSearch.length === 0 ? '搜索' : hotSearch"
            :maxlength="limit"
            v-model="searchWord"
            @input="onChange"
            confirm-type="search"
            @confirm="onComfirm"
            >
            <van-icon 
            v-if="searchWord.length > 0"
            name="close" 
            class="close_icon"
            @click="onClearClick"
            ></van-icon>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hotSearch: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      searchWord: ''
    }
  },
  methods: {
    onSearchBarClick () {
      this.$emit('onClick')
    },
    onClearClick () {
      this.searchWord = ''
      this.$emit('onClear')
    },
    onChange (e) {
      const {value} = e.mp.detail
      this.$emit('onChange', value)
    },
    onComfirm (e) {
      const {value} = e.mp.detail
      this.$emit('onComfirm', value)
    },
    setValue (value) {
      this.searchWord = value
    },
    getValue () {
      return this.searchWord
    }
  }
}
</script>

<style scoped>
.search {
    padding: 15px 15.5px;
}

.search_warpper {
    display: flex;
    align-items: center;
    background: #F5F7F9;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 12px 17px;
    height: 40px;
}

.input_search {
    flex: 1;
    padding: 0px 10px;
    color: #333;
    font-size:15px
}

.search_icon, .close_icon {
    color: #858c96;
    display: flex;
    align-items: center;
    height: 100%;
}



</style>