<template>
    <div class="detail_rate">
        <div 
        class="detail_rate_to_comment" 
        >轻点评分</div>
        <van-rate
        size="26"
        @change="onRateChange"></van-rate>
    </div>
</template>

<script>
export default {
  props: {
    rateValue: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onRateChange (e) {
      const {detail} = e.mp
      this.$emit('onRateChange', detail)
    }
  }
}
</script>

<style scoped>
.detail_rate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;

}
.detail_rate_to_comment {
    font-size: 13px;
    color: #99A0AA;
    line-height: 14px;
}
</style>