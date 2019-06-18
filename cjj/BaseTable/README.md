# Table组件文档

## Attributes
|参数|说明|类型|可选值|默认值|
|:-:|:-:|:-:|:-:|:-:|
|value/v-model|绑定值|object|—|—|
|columns|表格列配置,见``columns``配置|array|—|—|
|data|数据源|array|—|—|
|total|数据总条数|number|—|0|
|empty-text|占位文本|string|—|短横线“-”|
|column-options|表格列选项统一设置，具体键值参考element-ui的table-column的属性|object|—|—|
|page-options|分页组件的配置, 见``paginationOptions``配置|object|—|—|
|loading|加载状态|boolean|—|false|
|limit-table-height|限制表格高度，启用时``max-height``不生效|boolean|—|false|
|max-height|表格最大高度|number/string|—|—|
|pagination|是否显示分页|boolean|—|true|
|popover-options|提示框配置, 见``popoverOptions``配置|object|—|—|
|show-tooltip|是否需要显示tooltip, 需要搭配``content``或者具名插槽``content``使用|boolean|—|false|
|content|tooltip的内容|string|—|—|
|border-hide|隐藏边框|boolean|—|false|

### Columns
|参数|说明|类型|可选值|默认值|
|:-:|:-:|:-:|:-:|:-:|
|label|显示的标题|string|—|—|
|prop|对应列内容的字段名|string|—|—|
|slotName|表格列插槽名称|string|—|—|
|map|单元格内容映射表|array/object|—|—|
|columns|表格列配置|array|—|—|
|cellClass|单元格样式类名|string|Function(row)|—|—|
|...|element-ui库table-column组件上的属性都可添加|—|—|—|

### PaginationOptions
|参数|说明|类型|可选值|默认值|
|:-:|:-:|:-:|:-:|:-:|
|prevText|上翻页文字|string|—|—|
|nextText|下翻页文字|string|—|—|
|pageSizes|size选择下拉配置|number[]|—|[5, 10, 25, 50]|
|page|当前页|string|—|'page'|
|size|每页显示条数|string|—|'size'|

### PopoverOptions
|参数|说明|类型|可选值|默认值|
|slot|popover插槽名称|string|—|—|
|:-:|:-:|:-:|:-:|:-:|
|...|element-ui库popover组件上的属性都可添加|—|—|—|