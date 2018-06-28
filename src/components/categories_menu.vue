<template>
  <div :class="[isMobile?'menuview_mobile':'menuview']" >
    <!--<p>分类</p>-->
    <img src="../assets/menu.png" @click="tapShow"/>
    <transition name="bounce" v-for="(item,index) in categories" :key="index" >
      <div class="categoryView" v-if="isShow" @click="tap(item)">
        <span>{{item.name}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "categories_menu",
    props: ['categories', 'tap','isMobile'],
    data() {
      return {
        isShow: false,
      }
    },
    methods: {
      tapShow() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style scoped>
  .menuview {
    display: flex;
    flex-direction: row;
  }

  .menuview_mobile{
    display: flex;
    flex-direction: column;
  }

  .menuview img {
    width: 40px;
    height: 40px;
  }

  .menuview_mobile img {
    width: 30px;
    height: 30px;
  }

  .menuview .categoryView {
    height: 40px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px -1px 5px 0px #666666;
  }

  .menuview_mobile .categoryView {
    height: 30px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px -1px 5px 0px #666666;
  }

  .categoryView span {
    padding-left: 20px;
    padding-right: 20px;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .bounce-enter-active {
    animation: bounce-in .5s ;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    /*50% {*/
      /*transform: scale(0.5);*/
    /*}*/
    100% {
      transform: scale(1);
    }
  }

</style>
