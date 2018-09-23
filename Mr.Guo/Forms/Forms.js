import React from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  TimePicker,
  DatePicker,
  InputNumber,
} from 'antd';

import ImageUpload from '../ImageUpload';

import { parseRule } from './rules';
import styles from './styles.less';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { Button: RadioButton, Group: RadioGroup } = Radio;
const { MonthPicker, RangePicker } = DatePicker;

const emptyFn = () => {};

const getUUID = (() => {
  let uuid = 0;
  return () => uuid++;
})();

// Refered to the source code:
// https://github.com/react-component/form/blob/master/src/utils.js
function getValueFromEvent(evt) {
  if (!evt || !evt.target) {
    return evt;
  }
  const { target = {} } = evt;
  return target.type === 'checkbox' ? target.checked : target.value;
}

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.formRefs = {};
    this.state = {};
  }

  // componentWillReceiveProps() {
  //   this.state = {};  // clear data for options
  // }

  componentDidMount() {
    const { getForm = emptyFn, getRefs = emptyFn, form } = this.props;
    getForm(form);
    getRefs(this.formRefs);
    this.initFormChange();
  }

  handleChange = (key, value) => {
    const { onChange = emptyFn } = this.props;
    onChange(key, value);
  }

  initFormChange() {
    const formData = this.props.form.getFieldsValue();
    const formKeys = Object.keys(formData);
    formKeys.forEach(key => this.handleChange(key, formData[key]));
  }

  decorateFormField(key, options, itemCfg = {}) {
    const { disabledKeys = [] } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { disabled = false, placeholder = '', rules = [] } = itemCfg;
    const fieldValue = this.getFieldValue(key);
    const isDisabled = disabled === true || disabledKeys.indexOf(key) > -1;
    const _rules = this.getRules(rules, itemCfg);
    return formElement => getFieldDecorator(key, {
      rules: _rules,
      initialValue: fieldValue !== undefined ? fieldValue
        : (options.defaultValue !== undefined ? options.defaultValue : itemCfg.defaultValue),
      onChange: (...args) => {
        const value = options.getValueFromEvent
          ? options.getValueFromEvent(...args)
          : getValueFromEvent(...args);
        this.handleChange(key, value);
      },
      ...options,
    })(React.cloneElement(formElement, {
      disabled: isDisabled || formElement.props.disabled,
      placeholder: placeholder || formElement.props.placeholder,
      size: formElement.props.size || 'default',
      ref: (ref) => { this.formRefs[key] = ref; },
      ...itemCfg.props,
    }));
  }

  getRules(rules, itemCfg) {
    if (!rules || !rules.length) return [];
    return rules.map((rule) => {
      if (typeof rule === 'string') {
        return parseRule(rule, itemCfg);
      }
      // if (rule.validator) {
      //   return { ...rule, validator: rule.validator.bind(this) };
      // }
      return rule;
    }).filter(rule => rule);
  }

  getOptions(key) {
    const formItem = this.getFormItem(key);
    const options = formItem.options;
    if (typeof options === 'function') {
      if (this.state[key]) return this.state[key];
      this.state[key] = [];
      options().then(opts => this.setState({
        [key]: opts,
      }));
      return [];
    }
    return options || [];
  }

  getFieldValue(key) {
    const { formData = {} } = this.props;
    const formItem = this.getFormItem(key);
    const fieldValue = formData[key];
    if (fieldValue === undefined) return fieldValue;
    switch (formItem.type) {
      case 'checkbox': {
        const options = this.getOptions(key);
        return (fieldValue || []).filter(value => !!options.find(option => value === option.value));
      }
      case 'combo': {
        const options = this.getOptions(key);
        return formItem.multiple === true
          ? (fieldValue || []).filter(value => !!options.find(option => value === option.value))
          : options.find(option => fieldValue === option.value) ? fieldValue : undefined;
      }
      default:
        return fieldValue;
    }
  }

  getFormItem(key) {
    const { formItems = {} } = this.props;
    const formItem = formItems[key];
    if (!formItem) {
      console.error(`Forms: cannot find \`${key}\` in \`formItems\`.`);
      return {};
    }
    return formItem;
  }

  mapFormItems(keys) {
    const { form, layout = 'horizontal', formItemLayout: _itemLayout = {} } = this.props;
    return keys.map((key) => {
      const item = this.getFormItem(key);
      const { type } = item;
      const formItemLayout = layout === 'horizontal' ? {
        labelCol: item.labelCol || _itemLayout.labelCol || { span: 8 },
        wrapperCol: item.wrapperCol || _itemLayout.wrapperCol || { span: 16 },
      } : {};
      let children = null;
      switch (type) {
        case 'text':
        case 'textarea':
        case 'password':
          children = this.decorateFormField(key, {}, item)(
            <Input
              type={type}
              rows={4}
              placeholder={`请输入${item.label}`}
              addonBefore={item.prefix}
              addonAfter={item.surfix}
            />,
          );
          break;
        case 'number':
          children = this.decorateFormField(key, {}, item)(
            <InputNumber
              min={item.min}
              max={item.max}
              step={item.step}
            />,
          );
          break;
        case 'combo': {
          // fix dropdown menu position issue
          const comboClassName = `${key}_${getUUID()}`;
          const fixPopupProps = item.fixPopup ? {
            className: comboClassName,
            getPopupContainer: () => document.querySelector(`.${comboClassName}`),
          } : {};
          children = this.decorateFormField(key, {}, {
            ...item,
            props: {
              ...fixPopupProps,
              ...item.props,
            },
          })(
            <Select
              multiple={!!item.multiple}
              placeholder={`请选择${item.label}`}
              notFoundContent={'未找到匹配项'}
              dropdownMatchSelectWidth={false}
              filterOption={(value, option) => option.props.children.indexOf(value) > -1}
            >
              {this.getOptions(key).map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
              ))}
            </Select>,
          );
          break;
        }
        case 'checkbox': {
          children = this.decorateFormField(key, {}, item)(
            <CheckboxGroup>
              <Row>
                {this.getOptions(key).map(({ value, label, col }) => (
                  <Col key={value} span={12} {...item.optionCol} {...col}>
                    <Checkbox value={value}>{label}</Checkbox>
                  </Col>
                ))}
              </Row>
            </CheckboxGroup>,
          );
          break;
        }
        case 'radio':
        case 'radioButton': {
          const ChildRadio = type === 'radio' ? Radio : RadioButton;
          children = this.decorateFormField(key, {}, item)(
            <RadioGroup>
              <Row>
                {this.getOptions(key).map(({ value, label, col }) => (
                  <Col key={value} span={12} {...item.optionCol} {...col}>
                    <ChildRadio value={value}>{label}</ChildRadio>
                  </Col>
                ))}
              </Row>
            </RadioGroup>,
          );
          break;
        }
        case 'switcher':
          children = this.decorateFormField(key, {
            valuePropName: 'checked',
          }, item)(
            <Switch checkedChildren={item.onLabel || '开启'} unCheckedChildren={item.offLabel || '关闭'} />,
          );
          break;
        case 'timepicker': {
          const tpFormat = item.format || 'HH:mm:ss';
          children = this.decorateFormField(key, {}, item)(
            <TimePicker format={tpFormat} />,
          );
          break;
        }
        case 'datepicker':
        case 'datepickerMonth': {
          const pickerMap = { datepicker: DatePicker, datepickerMonth: MonthPicker };
          const Picker = pickerMap[type];
          children = this.decorateFormField(key, {
            // https://github.com/ant-design/ant-design/issues/3354
            // getValueProps: dateString => (typeof dateString === 'object'
            //   ? dateString.map(str => Moment(str, item.format)) : Moment(dateString, item.format)),
            // getValueFromEvent: (moment, dateString) => {
            //   return dateString;
            // }
          }, item)(
            <Picker
              showTime={item.showTime}
              format={item.format}
              placeholder={`请选择${item.label}`}
            />,
          );
          break;
        }
        case 'datepickerRange':
          children = this.decorateFormField(key, {})(
            <RangePicker
              showTime={item.showTime}
              format={item.format}
              placeholder={['起始日期', '结束日期']}
            />,
          );
          break;
        case 'image':
          children = this.decorateFormField(key, {}, item)(
            <ImageUpload tips={item.tips} limitType={item.limitType} limitSize={item.limitSize} />,
          );
          break;
        // Attention: Use FormItem to wrap your decorated inputs when number exceeds one.
        case 'custom':
          children = item.render((options = {}) => {
            const { key: _key = key, ..._options } = options;
            return this.decorateFormField(_key, _options, item);
          }, form);
          break;
        default:
          console.error(`Forms: 'type' of key '${key}' is required, check the 'formItems' props of Forms.`);
      }
      return children ? (
        <FormItem
          key={key}
          {...formItemLayout}
          label={item.label}
          hasFeedback={item.hasFeedback}
          extra={item.extra}
        >
          {children}
        </FormItem>
      ) : null;
    });
  }

  render() {
    const { formKeys, layout = 'horizontal' } = this.props;
    const isMultiCol = formKeys.length > 0 && typeof formKeys[0] === 'object';
    return (
      <Form layout={layout} className={styles.Forms}>
        {isMultiCol ? (
          <Row>
            {formKeys.map((cfg, idx) => (
              <Col key={idx} {...cfg.col}>
                {this.mapFormItems(cfg.keys)}
              </Col>
            ))}
          </Row>
        ) : (this.mapFormItems(formKeys))}
      </Form>
    );
  }
}

export default Form.create({
  withRef: true,
  // this function will be called when field is validating, thus depracate this option (chenyao)
  // https://github.com/react-component/form/issues/52
  // onFieldsChange(props, changedFields) {
  //   props.onChange(changedFields);
  // }
})(Forms);
