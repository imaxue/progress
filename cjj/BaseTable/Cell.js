export default {
  functional: true,

  name: 'Cell',

  render (h, context) {
    const {
      row = {},
      $index,
      column = {},
      prop,
      slotName,
      map,
      emptyText = '-',
      emptyValue,
      popoverOptions,
      cellClass
    } = context.props
    const className = typeof cellClass === 'function' ? cellClass(row) : (cellClass || '')
    const options = Object.assign({
      trigger: 'hover'
    }, popoverOptions)
    let value = emptyText
    if (typeof prop !== 'undefined') {
      value = row[prop]
      value = map ? (map[value] || map.default || value) : (emptyValue.includes(value) ? emptyText : value)
    }
    const cellVm = () => {
      if (slotName) {
        const scopedSlot = context.parent.$scopedSlots[slotName]
        if (scopedSlot) return scopedSlot({ prop, $index, row, value, column })
      }
      return <span class={ className }>{ value }</span>
    }
    const { slot, ...attrs } = options
    const content = slot && context.parent.$scopedSlots[slot]
    if (content) {
      return (
        <el-popover { ...{ attrs } }>
          { content({ prop, $index, row, value, column }) }
          <span slot="reference" class={ className }>{ cellVm() }</span>
        </el-popover>
      )
    }
    return cellVm()
  }
}
