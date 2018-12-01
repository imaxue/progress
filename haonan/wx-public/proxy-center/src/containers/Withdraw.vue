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
			<p class="history" @click="$router.push('/withdraw/history')">提现记录</p>
		</div>
		<div class="weui-cells weui-cells_form">
			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">提现金额</label>
				</div>
				<div class="weui-cell__bd">
					<input
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
					<label class="weui-label">姓名</label>
				</div>
				<div class="weui-cell__bd">
					<input
					 class="weui-input"
					 type="text"
					 placeholder="请输入支付宝账号姓名"
					/>
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">账号</label>
				</div>
				<div class="weui-cell__bd">
					<input
					 class="weui-input"
					 type="text"
					 placeholder="请输入支付宝账号"
					/>
				</div>
			</div>
		</div>
		<p class="tips">提现金额为10的倍数，单次提现不超过5000元</p>
		<div class="submit">
			<p>确定</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Withdraw"
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
		padding: 5px;
		text-align: center;
		color: #fff;
        border-radius: 15px;
		background-color: #468cfe;
	}
}
</style>

