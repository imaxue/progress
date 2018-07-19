<template>
  <div class="image-uploader">
    <ul class="image-preview">
      <li class="image-preview__item" v-for="(item, index) in files" :key="item.id" v-if="item && item.src">
        <img class="image-preview__image" :src="item.src" @load="imageLoaded($event, item)" :style="{width: item.width, height: item.height}" alt="">
        <div class="image-preview__operate">
          <span @click="replaceImage(index)">
            <slot name="refresh" v-if="$slots.refresh"></slot>
            <i v-else>○</i>
          </span>
          <span @click="removeImage(index)">
            <slot name="remove" v-if="$slots.remove"></slot>
            <i v-else>-</i>
          </span>
        </div>
      </li>
    </ul>
    <div class="image-add" v-if="addShow" @click="add">
      <slot name="add" v-if="$slots.add"></slot>
      <span v-else>+</span>
    </div>
      <input
        type="file"
        ref="file"
        :accept="accept"
        :multiple="multiple"
        v-bind="$attrs"
        v-on="inputListeners"
        @change="fileChanged" />
  </div>
</template>

<script>
// 图片上传预览组件
export default {
  name: 'image-uploader',
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: false
  },
  data () {
    return {
      files: [],
      insert: -1
    }
  },
  computed: {
    inputListeners () {
      let self = this
      return {
        ...this.$listeners,
        change (event) {
          let list = Array.from(event.target.files)
          self.$emit('input', list)
        }
      }
    },
    addShow () {
      let file = this.files[0]
      return this.multiple || !(file && file.src)
    }
  },
  methods: {
    getFiles () {
      return this.$refs.file.files
    },
    add () {
      this.$refs.file.value = null
      this.$refs.file.click()
    },
    imageLoaded (e, item) {
      let { naturalHeight: h, naturalWidth: w } = e.path[0] || {}
      if (h < w) {
        item.width = 'auto'
        item.height = '100%'
      }
    },
    fileChanged () {
      let list = Array.from(this.getFiles())
      let files = list.map(file => {
        let { name, size } = file
        let item = {
          name,
          size,
          file,
          width: '100%',
          height: 'auto',
          state: 'loading',
          src: null
        }
        this.html5Reader(file).then(result => {
          item.src = result
          item.state = 'loaded'
        }).catch(err => {
          console.log(err)
          item.state = 'error'
        })
        return item
      })
      if (this.insert > -1 && this.insert < this.files.length) {
        this.files.splice(this.insert, 1, ...files)
        this.insert = -1
      } else {
        if (this.multiple) {
          this.files.push(...files)
        } else {
          this.files = files
        }
      }
      this.$emit('change', list)
    },
    html5Reader (file) {
      const reader = new FileReader()
      const result = new Promise((resolve, reject) => {
        reader.onload = (e) => {
          resolve(e.target.result)
        }
        reader.onerror = (e) => {
          reject(e)
        }
      })
      reader.readAsDataURL(file)
      return result
    },
    replaceImage (index) {
      this.insert = index
      this.$refs.file.value = null
      this.$refs.file.click()
    },
    removeImage (index) {
      this.files.splice(index, 1)
      this.$refs.file.value = null
      this.$emit('change', [])
    }
  }
}
</script>

<style lang="stylus" scoped>
  flexWrap()
    display flex
    flex-wrap wrap

  .image-uploader
    flexWrap()
    padding 10px
    border 1px dashed #e6ebf5
    border-radius 5px
    input[type=file]
      position absolute
      width 0
      height 0
      opacity 0
      visibility hidden
  .image-preview
    flexWrap()
    margin-right 4px
    &__operate
      position absolute
      left 0
      bottom 0
      padding 2px 5px
      width 100%
      line-height 1
      color #fff
      text-align right
      background-color rgba(#000, 0.1)
      transform translate(0, 100%)
      transition all .3s
      span
        cursor pointer
        &:hover
          color #0081cc
    &__item
      position relative
      width 100px
      height 100px
      border 1px solid #e6ebf5
      overflow hidden
      &:hover
        .image-preview__operate
          transform translateY(0)
  .image-add
      line-height 100px
      @extend .image-preview__item
      text-align center
      font-size 28px
      color #e6ebf5
</style>

