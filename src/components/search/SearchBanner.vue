<template>
    <div class="search_banner" @click="onClick">
        <div class="icon_wrapper">
            <van-icon 
            :name="icon" 
            :style="{height: '20px', width: '20px'}"
            ></van-icon>
        </div>
        <div class="search_banner_info_wrapper">
            <div class="info_title">
                {{ title }}
            </div>
            <div class="info_sub_title">
                {{ subTitle }}
            </div>
        </div>
    </div>
</template>

<script>
import ImageView from '@/components/base/ImageView.vue'
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String
  },
  components: {
    ImageView
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  }
}
</script>

<style scoped>
.search_banner {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.icon_wrapper {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    border-radius: 50%;
    background: #F7F7F9;
}
.search_banner_info_wrapper {
    margin-left: 15px;
    width: 80%;
}
.info_title {
    font-size: 14px;
    color: #333333;
    line-height: 18.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
.info_sub_title {
    font-size: 12px;
    color: rgba(0,0,0,0.45);
    line-height: 16.5px;
}
</style>