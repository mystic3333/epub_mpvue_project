<template>
    <div class="auth">
        <div class="auth_wrapper">
            <div class="auth_img_title_wrapper">
                <div class="auth_img">
                    <image-view 
                    src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
                    height="100%"
                    round
                    ></image-view>
                </div>
                <div class="auth_sub_title">登录小牧读书</div>
                <div class="auth_title">全球好书免费看!</div>
            </div>
            <button class="auth_button" open-type="getUserInfo" @getuserinfo="getUserInfo" >授权登录</button>
        </div>
    </div>
</template>

<script>
import ImageView from '@/components/base/ImageView.vue'
export default {
  components: {
    ImageView
  },
  methods: {
    getUserInfo () {
      this.$emit('getUserInfo')
    }
  }
}
</script>

<style scoped>
.auth {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #999;
}
.auth_wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    width: 270px;
    height: 248px;
    background: #f5f5f5;
    border-radius: 18px
}
.auth_img_title_wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin-top: 22.5px; */
}
.auth_img_title_wrapper .auth_img {
    width: 74px;
    height: 74px;
}
.auth_img_title_wrapper .auth_sub_title {
    font-size: 13px;
    line-height: 12.5px;
    color: #999;
    margin-top: 18px;
}
.auth_img_title_wrapper .auth_title{
    font-size: 16px;
    color: #333;
    font-weight: 800;
    margin-top: 10px;
}
.auth_button{
    position: absolute;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
    border-radius: 0 0 18px 18px;
    font-size: 15px;
    color:#fff;
}
</style>