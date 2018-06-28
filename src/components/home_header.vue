<template>
  <div :class="[isMobile?'headerView_mobile':'headerView']">
    <img src="../assets/wechat.png" @click="showWechat"/>
    <div class="wechat" v-if="isShowWechat">597647185</div>
    <div>
      <a href="https://github.com/PeipeiQ" target="_blank">
        <img src="../assets/github.png"/>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home_header",
    props: ['isMobile'],
    data(){
      return{
        isShowWechat:false
      }
    },
    methods:{
      showWechat(){
        this.isShowWechat = !this.isShowWechat;
      }
    }
  }
</script>

<style scoped>

  .headerView {
    display: flex;
    flex-direction: row;
  }

  .headerView_mobile{
    display: flex;
    flex-direction: row;
  }

  .headerView img {
    height: 40px;
    width: 40px;
    margin-left: 50px;
  }

  .headerView_mobile img {
    height: 30px;
    width: 30px;
    margin-left: 40px;
  }

  .headerView .wechat{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  .headerView_mobile .wechat{
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

</style>
