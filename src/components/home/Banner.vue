<template>
    <div class="banner">
        <div class="bg_img" :style="'background-image:' + backgroundImg">
            <div class="title">
                这是一个美丽的广告栏~
            </div>
            <div class="sub_title" @click="onClick">
                {{ sub_title }}
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  props: {
    img: String,
    title: String,
    sub_title: String
  },
  computed: {
    backgroundImg () {
      return `url(${this.img})`
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  }
}
</script>

<style>
.banner {
    margin: 20px 20px 0px 20px;
    box-sizing: border-box;
}
.bg_img {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 125px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;

} 
.title {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
} 
.sub_title {
    font-size: 14px;
    color: #eeeeee;
    padding: 10px 20px;
    border-radius: 50px;
    background: #3eb7bbb6;
    margin-top: 15px;
}
</style>