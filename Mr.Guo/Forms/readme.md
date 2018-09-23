---
category: Components
subtitle: 基础表单
type: Data Entry
title: BaseForm
---

基础表单组件，对 antd 的表单进行了封装，用配置化的方式生成表单。

## API

### 参数说明 props

- **formItems: object**  
  表单域配置。
  对象键名为域名，键值为对象表示的域配置，对象的配置一般为：

  ```
  {
    type: string,
    label: string,
    defaultValue: any,
    rules: Array,
    options: Array | function, // for type of 'combo', 'checkbox', 'radio'
    onLabel: string,  // for type of 'switcher'
    offLabel: string, // for type of 'switcher'
    render: (decorator: function, form: object) => Component  // for type of 'custom'
  }
  ```

  其中 type 目前支持 'text', 'textarea', 'password', 'combo', 'checkbox', 'radio', 'radioButton', 'switcher', 'timepicker', 'datepicker' 以及 'custom' 类型，根据类型的不同又有各种不同的配置。

- **formKeys: Array**  
  需要渲染的表单域。
  可以传入一个域名数组以渲染出单列的表单；
  也可以传入一个对象数组以渲染多列的表单，如下配置可以渲染出一个两列的表单：

  ```
  formKeys = [{
    col: { span: 12 },
    keys: ['name']
  }, {
    col: { span: 12 },
    keys: ['sex']
  }]
  ```

  可以通过 formKeys 参数来实现表单域的显示和隐藏。
  *注意：所有的 keys 必须都要在 formItems 中定义过。*

- **formData?: object**  
  表单域值。
  *注意：从后台接收的数据可能需要先处理成表单组件可以接收的值。*

- **disabledKeys?: Array**  
  禁用的表单域。

- **getForm?: (form: object) => any**  
  获取到该表单的实例。
  表单实例有一些常用的方法，例如表单验证等，具体请参见[antd Form 表单](https://ant.design/components/form-cn/);

- **getRefs?: (refs: object) => any**
  获取表单元素的引用。  
  *Deprecated: 请谨慎使用该选项，可能在未来更新中移除。*

- **onChange?: (key: string, value: any) => any**  
  任一表单域的值发生改变时的回调。

### 用法示例 demo

- 基本用法  
  
  ```
  const formItems = {
    name: {
      type: 'text',
      label: '姓名',
      rules: [
        required: true, message: '姓名不能为空'
      ]
    },
    gender: {
      type: 'combo',
      label: '性别',
      options: [
        { value: 0, label: '男' },
        { value: 1, label: '女' }
      ]
    }
  };

  const formData = {
    name: 'andy',
    gender: 0
  };

  const Form = (props) => (
    <BaseForm
      formItems={formItems}
      formData={formData}
    />
  );
  ```

- 异步加载的选择框  
  对于需要异步加载的选择项，可以将 options 设置为一个函数并返回一个 Promise 对象。

  ```
  const formItems = {
    parentOrg: {
      type: 'combo',
      label: '所属组织',
      options: () => fetch('getOrgList', {})
        .then(response => response.json)
        .then(json => Promise.resolve(json.records.map(record => ({
          value: record.orgID,
          label: record.orgName
        }))))
    }
  };
  ```

- 自定义表单域  
  如果已有的 type 无法满足需求，则可以使用自定义表单域（type为'custom'）。

  ```
  const formItems = {
    parentOrg: {
      type: 'custom',
      label: '所属组织',
      render: decorator => (
        <Row>
          <Col span={15} styles={{width: '121px'}}>
            {decorator({
              rules: [{
                required: true, message: '请选择所属组织'
              }]
            })(
              <Input size="large" disabled />
            )}
          </Col>
          <Col span={7} offset={1}>
            <Button
              size="large"
              onClick={() => this.setState({ showOrgSelectModal: true })}
            >
              选择
            </Button>
          </Col>
        </Row>
      )
    }
  };
  ```

  *注意：当自定义组件中有多个域需要验证时，必须用 Form.FormItem 来包裹每个域。*
