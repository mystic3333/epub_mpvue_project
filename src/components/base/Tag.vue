<template>
    <div class="tag">
        <div class="content" @click="onClick"> 
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  methods: {
    onClick () {
      this.$emit('onTagClick')
    }
  }
}
</script>

<style scoped>
.tag {
    display: flex;
    justify-content: center;
    align-items: center;
}
.content{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 6px 17px;
    color:  #272E37;
    font-size: 14px;
}
</style>