<template>
    <div class="detail_stat">
        <div class="detail_stat_left">
            <div
            class="detail_stat_start_num"><span>{{ rankAvg }}</span>
            <van-rate
            disabled
            :allow-harf="true"
            :value="rankAvg"
            size="16"
            ></van-rate></div>
            <div class="detail_stat_comment_num">{{ rankNum }}人点评</div>
        </div>
        <div class="detail_stat_right">
            <div class="info_wrapper">
                <div class="info_wrapper_desc"><span class="num">{{ readerNum }}</span>人在阅读此书</div>
            </div>
            <div class="detail_stat_comment_user_avatar_wrapper">
                <div class="user_avater_inner" v-for="(item, index) in readers" :key="index">
                 
                    <image-view
                    :src="item.avatarUrl"
                    round
                    height="100%"
                    mode="scrollToFix"
                    ></image-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImageView from '@/components/base/ImageView.vue'

export default {
  props: {
    readers: {
      type: Array,
      default: []
    },

    readerNum: {
      type: Number,
      default: 0
    },
    rankNum: {
      type: Number,
      default: 0
    },
    rankAvg: String
  },
  components: {
    ImageView
  },
  computed: {
  },
  data () {
  }
}
</script>

<style scoped>
.detail_stat {
    display: flex;
    flex: 0 0 50%;
    margin-top: 20px;
    width: 100%;
}
.detail_stat_start_num {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    font-size: 24px;
    color: #5E5E5E;
}
.detail_stat_comment_num {
    font-size: 11px;
    color: #99A0AA;
    line-height: 14px;
}
.detail_stat_left {
  width: 50%;
}
.detail_stat_right {
  width: 50%;
    /* margin-left: 25px; */
}
.detail_stat_comment_user_avatar_wrapper{
    display: flex;
    
}
.user_avater_inner {
    width: 20px;
    height: 20px;
    margin-left: -8px;
    box-shadow: 0px 0px 3px 0;
    border-radius: 50%;

}
.user_avater_inner:first-child {
    margin-left:0px;
}
.info_wrapper_desc .num {
    font-size: 24px;
    color: #5E5E5E;
}
.info_wrapper_desc {
    font-size: 11px;
    color: #99A0AA;
    line-height: 30px;
}

</style>