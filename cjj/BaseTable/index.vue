<template>
  <div :class="['base-table', { 'border-hide': borderHide }]">
    <div class="base-table__wrapper">
      <el-table
        :data="data"
        :max-height="limitTableHeight ? tableHeight : maxHeight"
        tooltip-effect="light"
        v-loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        class="base-table__inner"
        ref="table"
        :border="false"
        :cell-class-name="borderHide ? 'border-hide' : ''"
        :highlight-current-row="true"
      >
        <div
          class="data-empty"
          slot="empty"
        >
          <slot name="empty">
            <span>暂无数据</span>
          </slot>
        </div>
        <!-- 默认table-column插槽 -->
        <slot/>
        <!-- 遍历columns -->
        <el-table-column
          v-for="{ align = 'center', header, columns: cols = [], ...attrs } in columns"
          v-bind="Object.assign({ showOverflowTooltip: true }, columnOptions, attrs)"
          :align="align"
          :key="attrs.prop"
        >
          <template
            v-if="header"
            v-slot:header="scope"
          >
            <slot
              v-if="header && $scopedSlots[header]"
              :name="header"
              v-bind="scope"
              :row="attrs"
            />
          </template>
          <nest-column
            v-if="cols.length > 0"
            :columns="cols"
            :options="columnOptions"
            :empty-text="emptyText"
            :empty-value="_emptyValue"
            v-bind="Object.assign({ popoverOptions }, attrs)"
          />
          <template
            v-if="!attrs.formatter && !attrs.type"
            #default="scope"
          >
            <v-cell
              v-if="cols.length === 0"
              v-bind="Object.assign({ popoverOptions }, scope, attrs)"
              :empty-text="emptyText"
              :empty-value="_emptyValue"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-if="pagination"
      v-bind="pageAttrs"
      style="padding: 12px 0"
      :current-page="query[pageAttrs.page]"
      :page-size="query[pageAttrs.size]"
      :total="total"
      layout="slot, total, sizes, ->, prev, pager, next"
      @size-change="handleChange({ [pageAttrs.size]: $event })"
      @current-change="handleChange({ [pageAttrs.page]: $event })"
      ref="page"
    >
      <template v-slot>
        <span
          class="el-pagination__total"
        >显示第{{ query[pageAttrs.size] * (query[pageAttrs.page] - 1) + 1 }}-{{ query[pageAttrs.size] * query[pageAttrs.page] }}条结果，</span>
      </template>
    </el-pagination>
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
     * @param { String } columns.slotName
     * @param { Object } columns.map
     * @param { Array } columns.columns
     */
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    emptyText: {
      type: String,
      default: '-'
    },
    columnOptions: Object,
    pageOptions: Object,
    loading: Boolean,
    limitTableHeight: Boolean,
    maxHeight: [String, Number],
    pagination: {
      type: Boolean,
      default: true
    },
    /**
     * 提示框配置项
     * slot属性是必须的，其他属性将绑定到popover组件上
     * @param { String } popoverOptions.slot 提示信息插槽名
     */
    popoverOptions: Object,
    borderHide: Boolean,
    emptyValue: null // 空值表
  },

  computed: {
    query: {
      get () {
        const { page, size } = this.pageAttrs
        return Object.assign({
          [page]: 1,
          [size]: 5
        }, this.value)
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    pageAttrs () {
      return Object.assign({
        prevText: '上一页',
        nextText: '下一页',
        pageSizes: [5, 10, 25, 50],
        page: 'page',
        size: 'size'
      }, this.pageOptions)
    },
    tableHeight () {
      if (this.limitTableHeight) return window.innerHeight - this.height
      return undefined
    },
    _emptyValue () {
      const values = [undefined, null]
      if (Array.isArray(this.emptyValue)) {
        return values.concat(this.emptyValue)
      }
      return values.concat([this.emptyValue])
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
      const { table, page } = this.$refs
      const { top = 0 } = table ? table.$el.getBoundingClientRect() : {}
      const { height = 0 } = page ? page.$el.getBoundingClientRect() : {}
      this.height = top + height
    }
  }
}
</script>