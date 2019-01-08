<template>
  <div class="base-table__wrapper">
    <el-table
      :data="data"
      :max-height="tableHeight"
      v-loading="loading"
      v-bind="$attrs"
      v-on="$listeners"
      class="base-table"
      ref="table"
    >
      <div class="data-empty" slot="empty">
        <slot name="empty">
          <span>暂无数据</span>
        </slot>
      </div>
      <el-table-column
        v-if="checked"
        type="selection"
        width="55"
      />
      <el-table-column
        v-for="item in columns"
        v-bind="Object.assign({}, columnOptions, item)"
        :key="item.prop"
      >
        <nest-column
          v-if="item.columns"
          :columns="item.columns"
        >
          <v-cell
            slot-scope="scope"
            v-bind="Object.assign({}, scope, item)"
            :empty-text="emptyText"
          />
        </nest-column>
        <v-cell
          v-bind="Object.assign({ popoverOptions }, scope, item)"
          slot-scope="scope"
          :empty-text="emptyText"
        />
      </el-table-column>
    </el-table>
    <div
      v-if="pagination"
      class="clearfix"
      style="padding: 10px"
      ref="page"
    >
      <el-pagination
        v-bind="pageAttrs"
        :page-size="query.size"
        :total="total"
        layout="slot, total, sizes"
        class="pull-left"
        @size-change="handleChange({ size: $event })"
      >
        <span
          class="el-pagination__total"
        >显示第{{ startRow }}-{{ endRow }}条结果，</span>
      </el-pagination>
      <el-pagination
        v-bind="pageAttrs"
        :current-page="query.page"
        :page-size="query.size"
        :total="total"
        layout="prev, pager, next"
        class="pull-right"
        @current-change="handleChange({ page: $event })"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import NestColumn from './NestColumn'
import Cell from './Cell'
export default {
  name: 'BaseTable',

  components: {
    NestColumn,
    'v-cell': Cell
  },

  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    /**
     * 列配置对象数组
     * @param { String } columns.label
     * @param { String } columns.prop
     * @param { String } columns.slot slotName
     * @param { Object } columns.map
     * @param { Array } columns.columns
     */
    columns: {
      type: Array,
      required: true,
      validator (value) {
        return value.every(item => item.prop)
      }
    },
    data: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    checked: Boolean,
    emptyText: {
      type: String,
      default: '-'
    },
    columnOptions: Object,
    pageOptions: Object,
    loading: Boolean,
    limitTableHeight: Boolean,
    pagination: {
      type: Boolean,
      default: true
    },
    /**
     * 提示框配置项
     * slot属性是必须的，其他属性将绑定到popover组件上
     * @param { String } popoverOptions.slot 提示信息插槽名
     */
    popoverOptions: Object
  },

  computed: {
    query: {
      get () {
        return Object.assign({
          page: 1,
          size: 5
        }, this.value)
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    startRow () {
      return this.query.size * (this.query.page - 1) + 1
    },
    endRow () {
      return this.query.size * this.query.page
    },
    pageAttrs () {
      return Object.assign({
        prevText: '上一页',
        nextText: '下一页',
        pageSizes: [5, 10, 25, 50]
      }, this.pageOptions)
    },
    tableHeight () {
      if (this.limitTableHeight) return window.innerHeight - this.height
      return undefined
    }
  },

  mounted () {
    this.limitTableHeight && this.setTableMaxHeight()
  },

  data () {
    return {
      height: 140 // 初始高度
    }
  },

  methods: {
    handleChange (value) {
      this.query = Object.assign(this.query, value)
    },
    setTableMaxHeight () {
      let { table, page } = this.$refs
      const { top = 0 } = table ? table.$el.getBoundingClientRect() : {}
      const { height = 0 } = page ? page.getBoundingClientRect() : {}
      this.height = top + height
    }
  }
}
</script>

<style lang="stylus">
.base-table
  border-radius 4px
  color color-text-regular
  &__wrapper
    .el-pagination
      color color-text-secondary
      .btn-prev
      .btn-next
        &:not(:disabled)
          color @color
    .el-pager
      .number
        margin 0 4px
        padding 0
        min-width $pager-item-size
        height $pager-item-size
        line-height @height
        border 1px solid border-color-base
        border-radius 4px
        font-size 13px
        font-weight normal
        &.active
          background-color color-primary
          color: color-white
</style>
