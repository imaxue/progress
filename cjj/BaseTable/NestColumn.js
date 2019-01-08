export default {
  functional: true,

  name: 'NestColumn',

  render (h, context) {
    const { props } = context
    const children = props.columns.map(({ label, prop, columns, ...data }) => {
      const slots = columns && columns.length > 0
        ? <nest-column data={columns}/>
        : undefined
      return (
        <el-table-column
          label={label}
          prop={prop}
          slot-scope={
            {
              default (props) {
                return context.data.scopedSlots.default({ ...props, prop, ...data })
              }
            }
          }
          slot={slots}
        />
      )
    })
    children.unshift(children.splice(-1))
    return <div>{children}</div>
  }
}
