export default {
  functional: true,

  name: 'NestColumn',

  render (h, context) {
    const { props } = context
    let { columns = [], options = {}, emptyText, emptyValue, ...attrs } = props
    const children = columns.map((column) => {
      const { label, prop, columns: cols = [], ...data } = column
      const _attrs = { ...options, ...data }
      const scoped = data.formatter ? {} : {
        scopedSlots: {
          default: (scope) => {
            const _props = { ...attrs, ..._attrs, label, prop, ...scope }
            return (<v-cell attrs={ _props } nest empty-text={ emptyText } empty-value={ emptyValue } />)
          }
        }
      }
      return (
        <el-table-column
          label={ label }
          prop={ prop }
          attrs={ _attrs }
          {
          ...scoped
          }
        >
          {
            cols.length > 0 && (<nest-column
              columns={ cols }
              empty-text={ emptyText }
              empty-value={ emptyValue }
              options={ options }
              attrs={ data }
            />)
          }
        </el-table-column>
      )
    })
    children.unshift(children.splice(-1))
    return <template>{ children }</template>
  }
}
