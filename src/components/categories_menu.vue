<template>
  <div class="menuview">
    <!--<p>分类</p>-->
    <img src="../assets/menu.png" @click="tapShow"/>
    <div class="categoryView" v-for="(item,index) in categories" v-if="isShow" @click="tap(item)">
      <span>{{item.name}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "categories_menu",
    props: ['categories', 'tap'],
    data(){
      return{
       isShow:false
      }
    },
    methods:{
      tapShow(){
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style scoped>
  .menuview {

    display: flex;
    flex-direction: row;
    /*width: 5%;*/
    /*height: 4%;*/
  }

  .menuview img{
    width: 40px;
    height: 40px;
  }

  .categoryView {
    /*width: 80px;*/
    height: 40px;
    /*width: 100px;*/
    /*background: aqua;*/
    /*margin-bottom: 20px;*/
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*border-radius: 50%;*/
    box-shadow: 1px -1px 5px 0px #666666;

  }

  .categoryView span {
    padding-left: 20px;
    padding-right: 20px;
    /*width: 70px;*/
    /*word-wrap: break-word;*/
  }

</style>
