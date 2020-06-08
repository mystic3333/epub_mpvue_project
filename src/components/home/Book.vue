<template>
  <div class="book">
    <div class="book_header">{{ showTitle == true ? title : '' }}</div>
    <div class="book_row" v-for="(item, index) in bookData" :key="index">
      <div 
      class="book_col" 
      v-for="(book, index2) in item" :key="index2" 
      :style="{flex: '0 0 ' + (100 / col) + '%' }">
        <div 
        class="book_wrapper" 
        :style="{flexDirection: mode === BOOK_MODE.COL ? 'column' : 'row'}"
        v-if="mode == 'row' || mode == 'col'"
        @click="onBookClick(book)"
        >
            <image-view
            :src="book.cover"
            ></image-view>
          <div class="title_wrapper title_wrapper_col" v-if="mode === BOOK_MODE.COL">
            <div class="book_title">{{book.title}}</div>
          </div>

          <div class="title_wrapper title_wrapper_row" v-else>
            <div class="book_title">{{book.title}}</div>
            <div class="book_title_author_wrapper">
              <div class="book_author">作者: {{book.author}}</div>
              <div class="book_category">共 {{book.category}} 本书</div>
            </div>
          </div>
        </div>

        <div 
        class="category_wrapper" 
        v-else
        @click="onCategoryClick(book)"
        >
            <div class="category_title">{{book.text}}</div>
            <div class="category_num">共: {{ book.num }} 本书</div>
        
           <div class="category_img_wrapper">
             <div class="category_cover1">
              <image-view :src="book.cover"></image-view>
             </div>
             <div class="category_cover2">
              <image-view :src="book.cover2"></image-view>
             </div>

           </div> 
        </div>
      </div>
    </div>
    <div class="book_footer" @click="onMoreClick"  v-if="showBtn">{{ btnText }}</div>
  </div>
</template>

<script>
import {BOOK_MODE, CATEGORY} from '@/utils/const.js'
import ImageView from '@/components/base/ImageView.vue'
export default {
  props: {
    title: {
      type: String,
      default: '为你推荐'
    },
    data: {
      type: Array,
      default: []
    },
    btnText: {
      type: String,
      default: '换一批'
    },
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 1
    },
    mode: {
      type: String,
      default: BOOK_MODE.row
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      type: Boolean,
      default: false
    }

  },
  components: {
    ImageView
  },
  data () {
    return {
      img: 'https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg'
    }
  },
  methods: {
    onBookClick (book) {
      console.log('book click...')
      this.$emit('onBookClick', book)
    },
    onMoreClick () {
      console.log('more click...')
      this.$emit('onMoreClick')
    },
    onCategoryClick (book) {
      this.$emit('onCategoryClick', book)
    }
  },
  mounted () {
    console.log(this.bookData)
  },
  computed: {
    BOOK_MODE () {
      return BOOK_MODE
    },
    bookData () {
      const { data, row, col } = this

      if (data && data.length > 0) {
        data.forEach(book => {
          book.text = CATEGORY[book.categoryText.toLowerCase()]
        })
        const number = row * col
        const _bookData = data.slice(0, number)
        const _bookDataRow = []
        let _row = 0
        while (_row < row) {
          let start = _row * col
          let end = _row * col + Number(col)
          _bookDataRow.push(_bookData.slice(start, end))
          _row++
        }
        return _bookDataRow
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped>
.book {
  margin: 30px 12px 0px 12px;
}
.book_header {
  font-size: 24px;
  font-weight: 500;
  padding-left: 10px;
}
.book_row {
  display: flex;
  /* justify-content: space-between; */
}
.book_col {
  margin-top: 15px;
  padding: 0px 8px;
  box-sizing: border-box;
}
.book_wrapper {
  display: flex;
}
.title_wrapper_col .book_title {
  font-size: 12px;
  font-weight: 500;
  max-height: 33px;
  line-height: 16.5px;
  overflow: hidden;
  word-break: break-word;
  margin: 5px 0px;
}
.title_wrapper_row  {
  padding: 0px 10px;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title_wrapper_row .book_title {
  color: #1F1F1F;
  font-size: 14px;
  line-height: 18px;
  max-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}
.book_author, .book_category {
  color: #868686;
  font-size: 12px;
  line-height: 14px;
  max-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  margin-top: 5px;
}
.book_footer {
  width: 100%;
  margin-top: 15px;
  padding: 10px 0px;
  text-align: center;
  color: rgb(51, 104, 173);
  box-sizing: border-box;
  background: #eee;
  border-radius: 30px;
}
.category_wrapper{
  position: relative;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  height: 96px;
  background: #F8F9FB;
  padding: 13.5px 0 16.5px 16px;
  box-sizing: border-box;
}
.category_title {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #212832;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.category_num {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #868686;
}
.category_img_wrapper {
  position: absolute;
  /* width: 60px;
  height: 66px; */
  right: 0px;
  bottom: 0px;
}
.category_cover1{
  position: absolute;
  width: 48px;
  right: 0px;
  bottom: -5px;
  z-index: 90;
  border-radius: 0 0 10px 0;
}
.category_cover2 {
  position: absolute;
  right: 20px;
  bottom: -5px;
  z-index: 100;
  width: 36px;
}
</style>

<style>
.category_cover1 image{
  border-radius: 0 0 10px 0;
}
</style>
