<template>
	<div class="withdraw">
		<div class="money">
			<div class="price">
				<img
				 src="/static/images/price.png"
				 alt="price"
				>
				<span>0.00</span>
			</div>
			<p
			 class="history"
			 @click="$router.push('/withdraw/history')"
			>提现记录</p>
		</div>
		<div class="weui-cells weui-cells_form">
			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">
						<span class="required">*</span> 提现金额
					</label>
				</div>
				<div class="weui-cell__bd">
					<input
					 v-model.number="form.amount"
					 @blur="verifyamount(false)"
					 class="weui-input"
					 type="number"
					 placeholder="单次最少提现10元"
					/>
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">提现至</label>
				</div>
				<div class="weui-cell__bd">
					<div class="alipay">
						<img
						 src="/static/images/alipay.png"
						 alt="alipayicon"
						>
						<span>支付宝支付</span>
					</div>
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">
						<span class="required">*</span> 账号
					</label>
				</div>
				<div class="weui-cell__bd">
					<input
					 v-model.trim="form.payNum"
					 class="weui-input"
					 type="text"
					 placeholder="请输入支付宝账号"
					/>
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">
						<span class="required">*</span> 姓名
					</label>
				</div>
				<div class="weui-cell__bd">
					<input
					 v-model.trim="form.payName"
					 class="weui-input"
					 type="text"
					 placeholder="请输入支付宝账号姓名"
					/>
				</div>
			</div>
		</div>
		<p class="tips">提现金额为10的倍数，单次提现不超过5000元</p>
		<div class="submit">
			<p @click="verifyForm">确定</p>
		</div>
		<loading :is-show-loading="isShowLoading" />
	</div>
</template>

<script>
export default {
	name: "Withdraw",

	data() {
		return {
			isVerifyPass: true,
			isShowLoading: false,
			form: {
				amount: "",
				payName: "",
				payNum: ""
			}
		};
	},

	methods: {
		verifyamount(isSubmit) {
			const amount = this.form.amount;
			let isPass = false;
			if (isSubmit && !amount) {
				this.$toast("请输入提现金额!");
			} else if (isNaN(amount)) {
				this.$toast("请输入数字!");
			} else if (amount === 0) {
				this.$toast("提现金额不能为0!");
			} else if (amount % 10 !== 0) {
				this.$toast("提现金额为10的倍数!");
			} else if (amount > 5000) {
				this.$toast("单次提现不能超过5000元!");
			} else {
				isPass = true;
			}

			if (isSubmit) this.isVerifyPass = isPass;
		},
		verifyForm() {
			this.isVerifyPass = true;
			for (const key in this.form) {
				if (this[`verify${key}`]) {
					this[`verify${key}`](true);
					if (!this.isVerifyPass) break;
				} else {
					if (this.form[key] === "") {
						if (key === "payName") {
							this.$toast("请输入支付宝账号姓名!");
						}
						if (key === "payNum") {
							this.$toast("请输入支付宝账号!");
						}
						this.isVerifyPass = false;
						break;
					}
				}
			}
			if (this.isVerifyPass) {
				this.withdraw();
			}
		},
		withdraw() {
			this.isShowLoading = true;
			this.$http
				.post("/api/agentCenter/cashOut", this.form)
				.then(({ data }) => {
					this.isShowLoading = false;
					return data;
				})
				.then(data => {
					if (data.code === 200) {
						this.$toast("信息提交成功,请等待工作人员审核!");
					} else {
						this.$toast(data.message);
					}
				})
				.catch(() => {
					this.isShowLoading = false;
					this.$toast("服务器开小差了!");
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.withdraw {
	.weui-cells_form {
		font-size: 14px;
	}
	.weui-input {
		text-align: right;
	}
}
.money {
	padding: 20px;
	text-align: center;
	background-color: #468cfe;
}
.price {
	margin-bottom: 10px;
	img {
		width: 30px;
		height: 30px;
	}
	span {
		font-size: 32px;
		color: #fff;
	}
}
.history {
	display: inline-block;
	padding: 0 25px;
	border: 1px solid #fff;
	border-radius: 10px;
	color: #fff;
}
.alipay {
	text-align: right;
	color: #969696;
	img {
		height: 20px;
		vertical-align: middle;
	}
}
.tips {
	padding-left: 15px;
	margin: 10px 0;
	color: #969696;
}
.submit {
	padding: 0 15px;
	p {
		padding: 10px 5px;
		text-align: center;
		color: #fff;
		border-radius: 20px;
		background-color: #468cfe;
	}
}
.required {
	line-height: 1;
	color: red;
}
</style>

