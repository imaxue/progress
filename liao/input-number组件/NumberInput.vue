
<template>
    <div class="__number_box">
       	<input type="text" 
           class="number-input"
		   :disabled="disabled"
		   :class="{disabled: disabled}"
           :value="currentValue" 
           @change="handleChange" />
    </div>
</template>
<script>
export default {
    props: {
		max: {
			//必须是数字类型
			type: Number,
			//默认值为Infinity
			default: Infinity
		},
		min: {
			type: Number,
			default: -Infinity
		},
		value: {
			type: Number,
			default: 0
		},
		type: {
			type: String,
			default: 'number'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		// 把父组件传递过来的数据再通过change传递回去
		params: {
			type: Object,
			default(){
				return {}
			}
		},
		change: {
			type: Function,
			default: () => {}
		}
		
	},
	//data是本组件的数据，作用域是组件本身
	//Vue组件为单向数据流，data为一个函数，currentValue设置为父组件的value，在input-number组件内部维护currentValue
	data () {
		return {
			//子组件将父组件传递过来的值进行保存，在本组件的作用域下进行使用
			currentValue: this.value
		}
	},
	//监听watch：监听data或者props的变化	
	watch: {
		//监听子组件currentValue是否改变
		currentValue (val) {
			//$emit与父组件通信  （子组件-->父组件）
			//this指向当前组件实例
			this.$emit('input', val);
			//定义自定义函数进行通信
			this.$emit('on-change', val)
		},
		//监听父组件value是否改变
		value (val) {
			this.updateValue(val);
		}
	},
	methods: {
		//父组件传递过来的值可能不符合条件（大于最大值，小于最小值）
		updateValue (val) {
			if(val > this.max) {
				val = this.max;
			}
			if(val < this.min) {
				val = this.min;
			}
			this.currentValue = val;
        },
        // /验证输入值是否为数字


        //props中的数据来自父组件
        //props实现与父组件的通信（父组件-->子组件）
        //对每个props进行校验，props的值可以是数组，也可以是对象，组件需要给别人使用时，推荐都进行数据验证
        isValueNumber (value) {
            
            if(this.type == 'number'){
                return /^(0|[1-9][0-9]*)$/.test(value + '');
            }else if(this.type == 'price'){
                return /^[0-9]+(.[0-9]{1,2})?$/.test(value + '');
            }else{
                // 可以匹配任意的小数位
                return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9]*$)|(^-?0{1}$)/).test(value + '');
            }
        },
		
		handleChange (event) {
			var val = event.target.value.trim();
			var max = this.max;
			var min = this.min;
			if(this.isValueNumber(val)) {
				val = Number(val);
				this.currentValue = val;
				if(val > max) {
					this.currentValue = max;
				}
				if(val < min) {
					this.currentValue = min;
				}
				
			} else {
				//如果输入的不是数字，将输入的内容重置为之前的currentValue
				event.target.value = this.currentValue;
			}
			this.change(this.currentValue, this.params)
		},
	},
	//初始化
	mounted () {
		this.updateValue(this.value);
	}
}
</script>
<style lang="less" >
.__number_box{
    display: inline-block;
    width: 100%;
    max-width: 180px;
    .number-input{
        width: 80%;
        height: 30px;
        line-height: 30px;
	}
	.disabled{
		background-color: #f5f7fa;
		// border-color: #e4e7ed;
		color: #c0c4cc;
		cursor: not-allowed;
	}
    input{
        outline:none;
        padding-left: 15px;
    }
}

</style>

	
