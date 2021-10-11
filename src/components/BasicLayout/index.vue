<template>
  <div id="main">
    <Navigation />
    <div class="main-view">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navigation from '@/components/Navigation';

export default {
  name: 'BasicLayout',
  components: { Navigation },
  created() {
    document.documentElement.scrollTop = 0;
  }
};
</script>
<style lang="scss" scoped>
#main {
  height: 100%;
}
.main-view {
  padding: 12px 24px;
  margin: 0 auto;
  background: #f1f4f6;
}
</style>
