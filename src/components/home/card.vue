<template>
    <div class="card">
        <div class="inner_card">
            <div class="user_info">
                <div class="user_avater_wrapper">
                  <image-view
                  :src="avatar"
                  height="100%"
                  mode="scallToFill"
                  round>
                  ></image-view>
                </div>
                <div class="user_name">{{ username }}</div>
                
                <div class="user_desc_wrapper">
                  <div class="user_desc">书架共{{ num }}本书</div>
                  <div class="dot"></div>
                  <div>特别精选</div>
                </div>
                 
            </div>
            <div class="book_info">
                <div class="book_info_wrapper" v-for="(book, index) in bookList" :key="index" >
                   <image-view
                    :src="book.cover"
                    @onCLick="onBookClick(book)"
                    ></image-view>
                </div>

                <div class="book_shelf_wrapper">
                  <div class="book_shelf">书架</div>
                  <van-icon class="arrow" name="arrow"></van-icon>
                </div>
            </div>
            
            <div class="feedback" @click="onFeedBackClick">
               反馈
            </div>
            <van-dialog id="van-dialog"></van-dialog>
        </div>
    </div>
</template>

<script>
import ImageView from '@/components/base/ImageView.vue'
import Dialog from 'vant-weapp/dist/dialog/dialog'

export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    ImageView
  },
  data () {
    return {
    }
  },
  methods: {
    onFeedBackClick () {
      Dialog.confirm({
        title: '反馈',
        text: '是否要进行反馈?',
        confirmText: '是',
        cancelText: '否'
      }).then(res => {
        console.log('反馈成功的提示')
      }).catch(e => {
        console.log('反馈失败的提示')
      })
    },
    onBookClick (book) {
      this.$emit('onBookClick', book)
    }
  },
  computed: {
    avatar () {
      return (this.data && this.data.userInfo && this.data.userInfo.avatarUrl) || ''
    },
    username () {
      return (this.data && this.data.userInfo && this.data.userInfo.nickName) || ''
    },
    bookList () {
      return (this.data && this.data.bookList) || []
    }
  }
}
</script>

<style>
.inner_card {
    position: relative;
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    box-sizing: border-box;
    padding: 20px;
    border-radius: 15px;
    margin:13px 20px;
}
.user_info {
  display: flex;
}
.user_name {
  color: #fff;
  margin-left: 8.5px;
  font-size: 12px;
}
.user_desc_wrapper {
  display: flex;
  align-items: center;
  color: #fff;
  opacity: .7;
  margin-left: 8.5px;
  font-size: 12px;
}
.user_desc {
  
}
.user_avater_wrapper {
  width: 20px;
  height: 20px;
}
.dot {
  width: 4px;
  height: 4px;
  background: #A2A2A2;
  border-radius: 50%;
  margin: 0px 10px;
}
.book_info {
    display: flex;
    justify-content: space-between;
    margin-top: 18.5px;
}
.book_info_wrapper {
  width: 72px;
  height: 101px;
}

.book_shelf_wrapper {
  display: flex;
  align-items: center;
  color: #fff;
  opacity: .7;
  font-size: 11px;
}
.book_shelf{
  width: 11px;
  margin-right: 8px;
}

.feedback {
    position: absolute;
    right:0px;
    top:19.5px;
    background: #070707;
    border-radius: 100px 0 0 100px;
    width: 44.5px;
    height: 23.5px;
    line-height: 23.5px;
    text-align: center;
    opacity: .3;
    font-size: 11px;
    color: white;
}

</style>