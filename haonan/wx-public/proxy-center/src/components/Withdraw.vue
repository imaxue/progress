<template>
  <div>
    <div class="money">
      <div class="price">
        <img src="/static/images/price.png" alt="price">
        <span>0.00</span>
      </div>
      <p class="history">提现记录</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Withdraw"
};
</script>

<style lang="scss" scoped>
.money {
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
  position: relative;
  display: inline-block;
  padding: 0 15px;
  border: 1px solid #fff;
  font-size: 14px;
  color: #fff;
}
</style>

