<template>
    <div class="detail_bottom">
        <div class="button_wrapper">
            <div :class=" isInShelf ? 'button_wrapper_remove' : 'button_wrapper_add'" @click="onShelfClick">{{ isInShelf ? '移出书架' : '加入书架' }}</div>
            <div class="button_wrapper_read" @click="onReadClick">阅读</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    isInShelf: Boolean

  },
  methods: {
    onShelfClick () {
      console.log('子组件bottom按钮触发')
      this.$emit('onShelfClick')
    },
    onReadClick () {
      this.$emit('onReadClick')
    }
  },
  mounted () {
    console.log('加载detailBottom组件完成')
  }
}
</script>

<style scoped>
.detail_bottom {
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0px;
    border: 1px solid #eee;
    background: #fff;
}
.button_wrapper {
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 48px;
    padding: 10px;
    box-sizing: border-box;
}

.button_wrapper_remove {
    width: 160px;
    height: 48px;
    border-radius: 30px;
    background: #64B6FF;
    color: #fff;
}

.button_wrapper_add {
    width: 160px;
    height: 48px;
    border-radius: 30px;
    background: #ffffff;
    border: 2px solid #64B6FF;
    color: #64B6FF;
}

.button_wrapper_read {
    width: 160px;
    height: 48px;
    border-radius: 30px;
    background: #64B6FF;
    color: #fff;
}
</style>