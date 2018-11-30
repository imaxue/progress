<template>
  <div class="form">
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
  name: "Form"
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
  &::before {
    position: absolute;
    top: -1px;
    left: -12.5px;
    content: "";
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
}
</style>

