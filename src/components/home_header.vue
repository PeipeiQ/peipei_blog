<template>
  <div class="headerView">
    <img src="../assets/wechat.png"/>
    <div>
      <a href="https://github.com/PeipeiQ" target="_blank">
        <img src="../assets/github.png"/>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home_header"
  }
</script>

<style scoped>

  .headerView {
    display: flex;
    flex-direction: row;
  }

  .headerView img {
    height: 40px;
    width: 40px;
    margin-left: 50px;
  }

</style>
