<template>
    <div class="image_view" @click="click" :style="{height}">
        <!-- mpvue中的图片组件为img, 小程序中的图片组件为image, 编译后会自动转换 -->
        <img
        :class="round ? 'round image' : 'image'"
        :src="src"
        :mode="mode"
        :lazy-load="lazyLoad"
        :style="{height, width}"
        @load="onLoad"
        @error="onError"
        v-show="!isLoading && !error"
        />
        <!-- 占位符图片: 固定的src地址 -->
        <img
        :class="round ? 'round image' : 'image'"
        src="https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
        :mode="mode"
        :lazy-load="lazyLoad"
        :style="{height, width}"
        v-show="isLoading || error"
        />
    </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'widthFix'
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
    round: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    },
    width: ''
  },
  data () {
    return {
      isLoading: true,
      error: false
    }
  },
  watch: {
    src (newValue, preValue) {
      if (newValue && newValue.length > 0 && newValue !== preValue) {
        this.$nextTick(() => {
          this.isLoading = true
          this.error = false
        })
      }
    }
  },
  methods: {
    click () {
      this.$emit('onCLick')
    },
    onLoad () {
      this.isLoading = false
      this.error = false
      // console.log('load', 'load')
    },
    onError () {
      this.error = true
      this.isLoading = false
      console.log('error', 'error')
    }
  }
}
</script>

<style>
.image_view {
    width: 100%;
}
.image_view .image {
    width: 100%;
}
.image_view .round {
    border-radius: 50%;
}
</style>