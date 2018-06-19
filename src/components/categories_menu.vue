<template>
  <div class="menuview">
    <p>分类</p>
    <div class="categoryView" v-for="(item,index) in categories" @click="tap(item)">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "categories_menu",
    props: ['categories','tap']

  }
</script>

<style scoped>
  .menuview {

    display: flex;
    flex-direction: column;
    /*background-color: #ffffff;*/

  }

  .categoryView{
    width: 80px;
    height: 80px;
    /*background: aqua;*/
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    box-shadow: 1px -1px 5px 0px #666666;


  }

  .categoryView span{
    width: 70px;
    word-wrap:break-word;
  }

</style>
