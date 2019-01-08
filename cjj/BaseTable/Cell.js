export default {
  functional: true,

  name: 'Cell',

  render (h, context) {
    const { row, $index, prop, slotName, map, emptyText = '-', popoverOptions } = context.props
    const options = Object.assign({
      trigger: 'hover'
    }, popoverOptions)
    let value = row[prop]
    value = (map ? (map[value] || map.default) : value) || emptyText
    const cellVm = () => {
      if (slotName) {
        const scopedSlot = context.parent.$scopedSlots[slotName]
        if (scopedSlot) return scopedSlot({ prop, $index, row, value })
      }
      return <span>{value}</span>
    }
    const { slot, ...attrs } = options
    const content = slot && context.parent.$scopedSlots[slot]
    if (content) {
      return (
        <el-popover {...{ attrs }}>
          {content({ prop, $index, row, value })}
          <span slot="reference">{cellVm()}</span>
        </el-popover>
      )
    }
    return cellVm()
  }
}
