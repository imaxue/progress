<template>
  <div class="home">
    <div class="top"></div>
    <div class="center">
        <div class="center-content">
            <div class="weui-grids">
            <div class="weui-grid">
                <div class="weui-grid__icon"> <img  src="/static/images/left1.png"/></div>
                <p class="weui-grid__label">我的佣金</p>
                <p class="weui-grid__label">Grid</p>
            </div>
            <div class="weui-grid">
                <div class="weui-grid__icon"><img  src="/static/images/right1.png"/></div>
                <p class="weui-grid__label">我的直推</p>
                <p class="weui-grid__label">Grid</p>
            </div>
            <div class="weui-grid">
                <div class="weui-grid__icon"><img  src="/static/images/left2.png"/></div>
                <p class="weui-grid__label">佣金提现</p>
                <p class="weui-grid__label">Grid</p>
            </div>
            <div class="weui-grid">
                <div class="weui-grid__icon"><img  src="/static/images/right2.png"/></div>
                <p class="weui-grid__label">二级团队</p>
                <p class="weui-grid__label">Grid</p>
            </div>
            <div class="weui-grid">
                <div class="weui-grid__icon"><img  src="/static/images/left3.png"/></div>
                <p class="weui-grid__label">我的总业绩</p>
                <p class="weui-grid__label">Grid</p>
            </div>
            <div class="weui-grid">
                <div class="weui-grid__icon"><img  src="/static/images/right3.png"/></div>
                <p class="weui-grid__label">团队总数</p>
                <p class="weui-grid__label">Grid</p>
            </div>
            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="weui-footer">
            <p class="weui-footer__text">Copyright &copy; 2008-2016 weui.io</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow-y: scroll;
  background-color: #f8f8f8;
}

.center {
  padding: 10px;
}

.center-content {
  border-radius: 10px;
  background-color: #fff;
  .weui-grids {
    &:before {
      border: 0 none;
    }
    &:after {
      border: 0 none;
    }
  }
  .weui-grid {
    width: 50%;
    &:nth-child(even) {
      &:before {
        border: 0 none;
      }
    }
    &:nth-child(5),
    &:nth-child(6) {
      &:after {
        border: 0 none;
      }
    }
  }
  .weui-grid__icon {
    img {
      background-color:#10aeff;
    }
  }
}
</style>
