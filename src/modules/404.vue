<template>
  <div class="wrapper">
    <img
      src="@/assets/404.svg"
      width="150"
      alt=""
    >
    <p class="font20 mt20">
      哎呀迷路了!
    </p>
    <section class="txl">
      <h4>可能的原因:</h4>
      <ul class="mt10">
        <li>原来的页面不存在了</li>
        <li>我们的服务器被外星人劫持了</li>
      </ul>
    </section>
    <div>
      <el-button
        type="primary"
        @click="$router.push('/collect/collectField')"
      >
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: auto;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.font20 {
  font-size: 20px;
}
section {
  display: inline-block;
  margin: 20px auto;
  color: $color-grey;
  ul {
    margin-left: 30px;
    li {
      list-style-type: disc;
    }
  }
}
</style>
